import { ItemInteraction } from '@prisma/client';
import { ItemCreateSchema } from 'lib/schemas';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export default router({
  list: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.auditLog.findMany({ include: { actor: true }, where: input })
    ),
  create: publicProcedure
    .input(
      z.object({
        interaction: z.nativeEnum(ItemInteraction),
        actorId: z.string(),
        itemId: z.string(),
        change: z.object({
          create: ItemCreateSchema
        })
      })
    )
    .mutation(({ ctx, input }) => ctx.prisma.auditLog.create({ data: input }))
});
