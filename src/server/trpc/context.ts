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

  let user = null;

  if (session.userId) {
    user = await prisma.user.findUnique({
      where: {
        externalId: session.userId
      }
    });
  }

  return {
    session,
    prisma,
    user
  };
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
