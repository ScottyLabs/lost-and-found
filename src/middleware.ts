import { Permission } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (['/admin', '/accounts'].includes(req.nextUrl.pathname)) {
        return !!token?.user && token.user.permission === Permission.ADMIN;
      }

      return !!token;
    }
  }
});

export const config = {
  matcher: ['/', '/admin', '/accounts', '/subscribe', '/subscriptions']
};
