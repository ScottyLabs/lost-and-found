import {
  SignedInAuthObject,
  SignedOutAuthObject
} from '@clerk/nextjs/dist/types/server';
import type { inferAsyncReturnType } from '@trpc/server';
import prisma from 'server/db/client';

export const createTRPCContext = async (opts: {
  headers: Headers;
  session: SignedInAuthObject | SignedOutAuthObject;
}) => {
  const session = opts.session;
  const source = opts.headers.get('x-trpc-source') ?? 'unknown';

  console.log('>>> tRPC Request from', source, 'by', session.userId);

  let account = null;

  if (session.userId) {
    account = await prisma.account.findUnique({
      where: {
        clerkId: session.userId
      }
    });
  }

  return {
    session,
    prisma,
    account
  };
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
