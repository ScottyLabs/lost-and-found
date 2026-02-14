import { Category, Color, Location, Status } from '@prisma/client';
import {
  ItemCreateSchema,
  ItemSearchSchema,
  ItemsUpdateSchema,
  ItemUpdateSchema
} from 'lib/schemas';
import { unparse } from 'papaparse';
import { z } from 'zod';
import { sendApprovalEmail } from '~/emails/mailgun';
import {
  adminProcedure,
  moderatorProcedure,
  publicProcedure,
  router
} from '../trpc';

export default router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.item.findUniqueOrThrow({ where: input })
    ),
  list: publicProcedure.query(({ ctx }) =>
    ctx.prisma.item.findMany({
      orderBy: {
        foundDate: 'desc'
      },
      take: 50
    })
  ),
  listPublic: publicProcedure
    .input(
      z.object({
        query: z.string().default(''),
        categories: z.array(z.nativeEnum(Category)).default([]),
        colors: z.array(z.nativeEnum(Color)).default([]),
        locations: z.array(z.nativeEnum(Location)).default([]),
        date: z.coerce.date().nullable().default(null),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(50)
      })
    )
    .query(async ({ ctx, input }) => {
      const queryTrimmed = input.query.trim();
      const queryFilter =
        queryTrimmed === ''
          ? {}
          : {
              OR: [
                { name: { contains: queryTrimmed, mode: 'insensitive' as const } },
                {
                  shortDescription: {
                    contains: queryTrimmed,
                    mode: 'insensitive' as const
                  }
                },
                {
                  foundDescription: {
                    contains: queryTrimmed,
                    mode: 'insensitive' as const
                  }
                }
              ]
            };
      const where = {
        status: Status.APPROVED,
        ...queryFilter,
        ...(input.categories.length
          ? { categories: { hasSome: input.categories } }
          : {}),
        ...(input.colors.length ? { color: { in: input.colors } } : {}),
        ...(input.locations.length
          ? { foundLocation: { in: input.locations } }
          : {}),
        ...(input.date ? { foundDate: { gt: input.date } } : {})
      };
      const [items, totalCount] = await Promise.all([
        ctx.prisma.item.findMany({
          where,
          orderBy: { foundDate: 'desc' },
          skip: (input.page - 1) * input.limit,
          take: input.limit
        }),
        ctx.prisma.item.count({ where })
      ]);
      return { items, totalCount };
    }),
  search: publicProcedure.input(ItemSearchSchema).query(async ({ ctx, input }) => {
    let startOfDayDate: Date | undefined;
    let endOfDayDate: Date | undefined;
    if (input.date) {
      startOfDayDate = new Date(input.date);
      startOfDayDate.setUTCHours(0, 0, 0, 0);

      endOfDayDate = new Date(input.date);
      endOfDayDate.setUTCHours(23, 59, 59, 999);
    }

    const where = {
      name: {
        contains: input.query
      },
      color: input.color ?? undefined,
      status: input.status ?? undefined,
      value: input.value ?? undefined,
      categories: input.category ? { has: input.category } : undefined,
      foundDate: input.date
        ? { gte: startOfDayDate, lte: endOfDayDate }
        : undefined
    };

    const [items, totalCount] = await Promise.all([
      ctx.prisma.item.findMany({
        where,
        orderBy: { foundDate: 'desc' },
        skip: (input.page - 1) * input.limit,
        take: input.limit
      }),
      ctx.prisma.item.count({ where })
    ]);

    return { items, totalCount };
  }),
  download: adminProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      const items = await ctx.prisma.item.findMany({
        where: { id: { in: input } }
      });
      const csv = unparse(items, { header: true });
      return csv;
    }),
  infiniteItems: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish()
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const items = await ctx.prisma.item.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          foundDate: 'desc'
        }
      });

      let nextCursor: typeof cursor | undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor
      };
    }),
  create: moderatorProcedure
    .input(ItemCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const createdItem = await ctx.prisma.item.create({ data: input });
      await sendApprovalEmail(createdItem);
      return createdItem;
    }),
  update: moderatorProcedure
    .input(ItemUpdateSchema)
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.item.update({ where: { id: input.id }, data: input.data })
    ),
  massUpdate: adminProcedure
    .input(ItemsUpdateSchema)
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.item.updateMany({
        where: { id: { in: input.ids } },
        data: input.data
      })
    ),
  delete: adminProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.item.deleteMany({ where: { id: { in: input } } })
    ),
  unarchivedOlderThan: adminProcedure
    .input(z.object({ age: z.coerce.number() }))
    .query(async ({ ctx, input }) =>
      ctx.prisma.item.findMany({
        where: {
          status: { not: Status.ARCHIVED },
          foundDate: {
            gt: new Date(new Date().getTime() - input.age * 1000 * 60 * 60 * 24)
          }
        }
      })
    )
});
