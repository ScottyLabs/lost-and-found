import { Building, ItemInteraction } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export default router({
  list: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.permission.findMany({
      where: { actorId: ctx.session.user.id }
    })
  ),
  create: protectedProcedure
    .input(
      z.object({
        interaction: z.nativeEnum(ItemInteraction),
        building: z.nativeEnum(Building)
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.permission.create({
        data: { actorId: ctx.session.user.id, ...input }
      })
    ),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.permission.delete({ where: input })
    )
});
