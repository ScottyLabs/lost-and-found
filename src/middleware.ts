import { withAuth } from 'next-auth/middleware';

export default withAuth({
  // callbacks: {
  //   authorized({ req, token }) {
  //     // `/admin` requires admin role
  //     if (req.nextUrl.pathname === '/admin') {
  //       return token?.userRole === 'admin';
  //     }
  //     // `/` only requires the user to be logged in
  //     return !!token;
  //   }
  // }
});

export const config = { matcher: ['/', '/admin', '/accounts'] };
