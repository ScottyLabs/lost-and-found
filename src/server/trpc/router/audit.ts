import { ItemInteraction } from '@prisma/client';
import { ItemCreateSchema } from 'lib/schemas';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export default router({
  list: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.auditLog.findMany({ include: { actor: true }, where: input })
    ),
  create: protectedProcedure
    .input(
      z.object({
        interaction: z.nativeEnum(ItemInteraction),
        itemId: z.string(),
        change: z.object({ create: ItemCreateSchema })
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.auditLog.create({
        data: { actorId: ctx.session.user.id, ...input }
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.auditLog.create({
        data: { ...input, actorId: ctx.session.user.id }
      })
    )
});
