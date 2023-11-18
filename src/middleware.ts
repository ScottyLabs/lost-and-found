import { Permission } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ['/manage'];
  const matchesProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (matchesProtectedPath) {
    const token = await getToken({ req: request });
    if (!token) {
      const url = new URL(`/auth/signin`, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token.user.permission === Permission.USER) {
      const url = new URL(`/auth/error?error=AccessDenied`, request.url);
      return NextResponse.rewrite(url);
    }
  }

  const protectedPathsMod = ['/manage/users'];
  const matchesProtectedPathsMod = protectedPathsMod.some((path) =>
    pathname.startsWith(path)
  );
  if (matchesProtectedPathsMod) {
    const token = await getToken({ req: request });
    if (!token) {
      const url = new URL(`/auth/signin`, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token.user.permission === Permission.MODERATOR) {
      const url = new URL(`/auth/error?error=AccessDenied`, request.url);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
