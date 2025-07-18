import { Status } from '@prisma/client';
import {
  ItemCreateSchema,
  ItemSearchSchema,
  ItemsUpdateSchema,
  ItemUpdateSchema
} from 'lib/schemas';
import { DateTime } from 'luxon';
import { unparse } from 'papaparse';
import { z } from 'zod';
import { archived_items } from '../../../emails/mailgun';
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
      }
    })
  ),
  search: publicProcedure.input(ItemSearchSchema).query(({ ctx, input }) => {
    let startOfDay: Date | undefined;
    let endOfDay: Date | undefined;

    const dtUtc = DateTime.fromJSDate(input.date, { zone: 'utc' });
    const dtEt = dtUtc.setZone('America/New_York');
    const startET = dtEt.startOf('day');
    const endET = startET.plus({ days: 1 });

    (startOfDay = startET.toUTC().toJSDate()),
      (endOfDay = endET.toUTC().toJSDate());

    return ctx.prisma.item.findMany({
      where: {
        name: {
          contains: input.query
        },
        color: input.color ?? undefined,
        status: input.status ?? undefined,
        value: input.value ?? undefined,
        categories: input.category ? { has: input.category } : undefined,
        foundDate: input.date ? { gte: startOfDay, lte: endOfDay } : undefined
      }
    });
  }),
  download: moderatorProcedure
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
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.item.create({ data: input })
    ),
  update: adminProcedure
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
    ),
  autoArchive: adminProcedure.mutation(async ({ ctx }) => {
    const archivedItems = await ctx.prisma.item.findMany({
      where: {
        status: Status.APPROVED,
        foundDate: {
          // 30 days ago
          lt: new Date(new Date().getTime() - 30 * 1000 * 60 * 60 * 24)
        }
      }
    });

    await archived_items(archivedItems);

    return ctx.prisma.item.updateMany({
      where: {
        status: Status.APPROVED,
        foundDate: {
          // 30 days ago
          lt: new Date(new Date().getTime() - 30000)
        }
      },
      data: { status: Status.ARCHIVED }
    });
  })
});
