import { Category } from '@prisma/client';
import { z } from 'zod';
import { adminProcedure, protectedProcedure, router } from '../trpc';

export default router({
  list: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.subscription.findMany({
      where: {
        userId: ctx.user.id
      }
    })
  ),
  create: protectedProcedure
    .input(z.object({ category: z.nativeEnum(Category) }))
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.subscription.create({
        data: {
          userId: ctx.user.id,
          emailAddress: ctx.session.user?.emailAddresses[0]?.emailAddress,
          ...input
        }
      })
    ),
  delete: protectedProcedure
    .input(z.object({ category: z.nativeEnum(Category) }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.subscription.delete({
        where: {
          userId_category: {
            category: input.category,
            userId: ctx.user.id
          }
        }
      })
    ),
  removeExpired: adminProcedure.mutation(({ ctx }) => {
    const weekTime = 604800000;
    return ctx.prisma.subscription.deleteMany({
      where: {
        createdAt: {
          lt: new Date(new Date().getTime() - weekTime)
        }
      }
    });
  })
});
