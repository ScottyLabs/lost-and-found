import { publicProcedure, router } from '../trpc';

export default router({
	getAll: publicProcedure.query(async ({ ctx }) => ctx.prisma.item.findMany())
});
