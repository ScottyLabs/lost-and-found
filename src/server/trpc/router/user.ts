import { clerkClient } from '@clerk/nextjs/server';
import {
  UserCreateSchema,
  UserSearchSchema,
  UserUpdateSchema
} from 'lib/schemas';
import { z } from 'zod';
import {
  adminProcedure,
  moderatorProcedure,
  publicProcedure,
  router
} from '../trpc';

export default router({
  me: publicProcedure.query(({ ctx }) => {
    if (ctx.session.userId) {
      return ctx.prisma.account.upsert({
        where: { clerkId: ctx.session.userId },
        update: {},
        create: { clerkId: ctx.session.userId }
      });
    }

    return null;
  }),
  count: publicProcedure.query(({ ctx }) => ctx.prisma.account.count()),
  search: moderatorProcedure
    .input(UserSearchSchema)
    .query(async ({ ctx, input }) => {
      const accounts = await ctx.prisma.account.findMany();
      const data = await Promise.all(
        accounts.map(async (account) => {
          const user = await clerkClient.users.getUser(account.clerkId);
          return { account, user };
        })
      );
      return data.filter(({ user, account }) => {
        if (user.username) {
          return user.username
            .toLowerCase()
            .includes(input.query.toLowerCase());
        }
        return true;
      });
    }),
  byId: moderatorProcedure
    .input(z.string())
    .query(({ ctx, input }) =>
      ctx.prisma.account.findFirst({ where: { clerkId: input } })
    ),
  update: adminProcedure
    .input(UserUpdateSchema)
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.account.update({
        where: { clerkId: input.clerkId },
        data: input.data
      })
    ),
  create: adminProcedure
    .input(UserCreateSchema)
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.account.create({ data: input })
    ),
  delete: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.account.delete({ where: { clerkId: input } })
    )
});
