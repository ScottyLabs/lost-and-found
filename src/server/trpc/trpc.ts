import { Permission } from '@prisma/client';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? fromZodError(error.cause).message
            : error.message
      }
    };
  }
});

export const { router } = t;

/**
 * Unprotected procedure
 * */
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const user = await ctx.prisma.user.findUniqueOrThrow({
    where: { externalId: ctx.session.userId }
  });

  return next({
    ctx: {
      session: ctx.session,
      user
    }
  });
});

const isModerator = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const user = await ctx.prisma.user.findUniqueOrThrow({
    where: { externalId: ctx.session.userId }
  });

  if (user.permission === Permission.USER) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }

  return next({
    ctx: {
      session: ctx.session,
      user
    }
  });
});

/**
 * Moderator procedure
 */
export const moderatorProcedure = protectedProcedure.use(isModerator);

/**
 * Reusable middleware to ensure
 * user is an admin
 */
const isAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const user = await ctx.prisma.user.findUniqueOrThrow({
    where: { externalId: ctx.session.userId }
  });

  if (user.permission !== Permission.ADMIN) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }

  return next({
    ctx: {
      session: ctx.session,
      user
    }
  });
});

/**
 * Admin procedure
 */
export const adminProcedure = protectedProcedure.use(isAdmin);
