// Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs

import type { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession as unstableGetServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

// Next API route example - /pages/api/restricted.ts
export default async (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => unstableGetServerSession(ctx.req, ctx.res, authOptions);
