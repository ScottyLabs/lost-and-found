import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export default router({
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) =>
    ctx.prisma.account.delete({
      where: { id: input },
      include: { user: true }
    })
  )
});
