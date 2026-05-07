import { TRPCError } from '@trpc/server';
import { protectedProcedure, router } from '../trpc';

function assertDevelopmentOnly() {
  if (process.env.NODE_ENV !== 'development') {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Not available' });
  }
}

export default router({
  /** Dev-only full DB snapshot for the /test page. */
  snapshot: protectedProcedure.query(async ({ ctx }) => {
    assertDevelopmentOnly();
    const [items, users, auditLogs, subscriptions, verificationTokens] =
      await Promise.all([
        ctx.prisma.item.findMany({ orderBy: { createdAt: 'desc' } }),
        ctx.prisma.user.findMany(),
        ctx.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' } }),
        ctx.prisma.subscription.findMany(),
        ctx.prisma.verificationToken.findMany()
      ]);
    return {
      items,
      users,
      auditLogs,
      subscriptions,
      verificationTokens
    };
  })
});
