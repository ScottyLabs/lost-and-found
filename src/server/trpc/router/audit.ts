import { AuditLogCreateSchema } from 'lib/schemas';
import { z } from 'zod';
import { moderatorProcedure, router } from '../trpc';

export default router({
  list: moderatorProcedure
    .input(z.object({ itemId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.auditLog.findMany({ include: { actor: true }, where: input })
    ),
  create: moderatorProcedure
    .input(AuditLogCreateSchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.auditLog.create({
        data: { actorId: ctx.session.userId, ...input }
      })
    )
});
