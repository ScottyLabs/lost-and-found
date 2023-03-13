import { Category } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export default router({
  list: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.subscription.findMany({
      where: {
        userId: ctx.session.user.id
      }
    })
  ),
  create: protectedProcedure
    .input(z.object({ category: z.nativeEnum(Category) }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.subscription.create({
        data: { userId: ctx.session.user.id, ...input }
      })
    ),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.subscription.delete({ where: input })
    )
});
