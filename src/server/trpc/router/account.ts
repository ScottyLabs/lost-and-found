import { z } from 'zod';
import { adminProcedure, router } from '../trpc';

export default router({
  delete: adminProcedure.input(z.string()).mutation(({ ctx, input }) =>
    ctx.prisma.account.delete({
      where: { id: input },
      include: { user: true }
    })
  )
});
