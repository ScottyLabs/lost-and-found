import { Category } from '@prisma/client';
import { z } from 'zod';
import { adminProcedure, protectedProcedure, router } from '../trpc';

export default router({
  list: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.subscription.findMany({
      where: {
        userId: ctx.session.userId
      }
    })
  ),
  create: protectedProcedure
    .input(z.object({ category: z.nativeEnum(Category) }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.subscription.create({
        data: {
          userId: ctx.session.userId,
          ...input,
          emailAddress: ctx.session.user?.emailAddresses[0]?.emailAddress
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
            userId: ctx.session.userId
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
