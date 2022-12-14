import { Building, ItemInteraction } from '@prisma/client';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export default router({
  list: publicProcedure
    .input(z.object({ actorId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.userPermission.findMany({
        where: input
      })
    ),
  create: publicProcedure
    .input(
      z.object({
        actorId: z.string(),
        interaction: z.nativeEnum(ItemInteraction),
        building: z.nativeEnum(Building)
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.userPermission.create({ data: input })
    ),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.userPermission.delete({ where: input })
    )
});
