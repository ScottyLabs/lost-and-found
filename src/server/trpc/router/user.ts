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
  infiniteItems: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish()
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const users = await ctx.prisma.user.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          email: 'asc'
        }
      });

      let nextCursor: typeof cursor | undefined;
      if (users.length > limit) {
        const nextUser = users.pop();
        nextCursor = nextUser!.id;
      }

      return {
        users,
        nextCursor
      };
    }),
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
