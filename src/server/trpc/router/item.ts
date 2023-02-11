import { ItemCreateSchema, ItemUpdateSchema } from 'lib/schemas';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export default router({
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.item.findMany({
      orderBy: {
        foundDate: 'desc'
      }
    })
  ),
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
  create: publicProcedure
    .input(ItemCreateSchema)
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.item.create({ data: input })
    ),
  update: publicProcedure
    .input(ItemUpdateSchema)
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.item.update({ where: { id: input.id }, data: input.data })
    ),
  delete: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.item.deleteMany({ where: { id: { in: input } } })
    )
});
