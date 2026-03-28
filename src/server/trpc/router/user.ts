import { clerkClient } from '@clerk/nextjs/server';
import {
  UserCreateSchema,
  UserSearchSchema,
  UserUpdateSchema
} from 'lib/schemas';
import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '../trpc';

export default router({
  me: publicProcedure.query(({ ctx }) => {
    if (ctx.session.userId) {
      return ctx.prisma.user.upsert({
        where: { externalId: ctx.session.userId },
        update: {},
        create: { externalId: ctx.session.userId }
      });
    }

    return null;
  }),
  count: publicProcedure.query(({ ctx }) => ctx.prisma.user.count()),
  search: adminProcedure
    .input(UserSearchSchema)
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.user.findMany();
      const data = await Promise.all(
        users.map(async (user) => {
          const clerkUser = await clerkClient.users.getUser(user.externalId);
          return { clerkUser, user };
        })
      );

      return data.filter(({ clerkUser }) => {
        if (clerkUser.username) {
          return clerkUser.username
            .toLowerCase()
            .includes(input.query.toLowerCase());
        }

        return true;
      });
    }),
  byId: adminProcedure
    .input(z.string())
    .query(({ ctx, input }) =>
      ctx.prisma.user.findFirst({ where: { externalId: input } })
    ),
  update: adminProcedure
    .input(UserUpdateSchema)
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.user.update({
        where: { externalId: input.externalId },
        data: input.data
      })
    ),
  create: adminProcedure
    .input(UserCreateSchema)
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.user.create({ data: input })
    ),
  delete: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.user.delete({ where: { externalId: input } })
    )
});
