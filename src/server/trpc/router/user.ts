import { z } from 'zod';
import {
	UserCreateSchema,
	UserListSchema,
	UserUpdateSchema
} from '../../../lib/schemas';
import { publicProcedure, router } from '../trpc';

export default router({
	count: publicProcedure.query(({ ctx }) => ctx.prisma.user.count()),
	list: publicProcedure.input(UserListSchema).query(({ ctx, input }) =>
		ctx.prisma.user.findMany({
			take: input.limit,
			skip: (input.page - 1) * input.limit,
			orderBy: { email: 'asc' },
			where: {
				name: {
					contains: input.user?.name,
					mode: 'insensitive'
				},
				email: {
					contains: input.user?.email,
					mode: 'insensitive'
				}
			}
		})
	),
	byId: publicProcedure
		.input(z.string())
		.query(({ ctx, input }) =>
			ctx.prisma.user.findFirst({ where: { id: input } })
		),
	update: publicProcedure
		.input(UserUpdateSchema)
		.mutation(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.findFirstOrThrow({
				where: { id: input.id }
			});
			await ctx.prisma.user.update({ where: { id: user.id }, data: input });
			return user;
		}),
	create: publicProcedure
		.input(UserCreateSchema)
		.mutation(async ({ ctx, input }) => ctx.prisma.user.create({ data: input }))
});
