import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import env from 'env/server.mjs';
import prisma from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ user }) => {
      const isAllowedToSignIn = user.email?.endsWith('cmu.edu');
      if (isAllowedToSignIn) return true;
      return false; // TODO: return custom unauthorized page
    },
    session: async ({ session, user }) => {
      // Send properties to the client, like an access_token and user id from a provider.
      // eslint-disable-next-line no-param-reassign
      session.user = JSON.parse(JSON.stringify(user));
      return session;
    }
  },
  secret: env.NEXTAUTH_SECRET,
  theme: { logo: '/dog-logo.svg' },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: 'auth/signin'
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};

export default NextAuth(authOptions);
