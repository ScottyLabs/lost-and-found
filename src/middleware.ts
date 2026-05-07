import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/found(.*)',
  '/faq(.*)',
  '/policies(.*)',
  '/api/trpc(.*)',
  '/api/autoArchive(.*)',
  '/api/subscriptions(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const isClerkDevHandshake =
    req.nextUrl.searchParams.has('__dev_session') &&
    req.nextUrl.searchParams.has('__clerk_db_jwt');
  const isPublic = isPublicRoute(req);

  if (isClerkDevHandshake) {
    return;
  }

  if (isPublic) {
    return;
  }

  await auth.protect();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
