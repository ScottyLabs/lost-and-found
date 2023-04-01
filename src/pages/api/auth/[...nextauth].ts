/* eslint-disable no-param-reassign */
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';
import env from 'env/server.mjs';
import prisma from 'server/db/client';

export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ user }) => {
      const isAllowedToSignIn = user.email?.endsWith('cmu.edu');
      if (isAllowedToSignIn) return true;
      return false; // TODO: return custom unauthorized page
    },
    session: async ({ session, token }) => {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token.user) session.user = token.user as User;
      if (token.sub) session.user.id = token.sub;

      return session;
    },
    jwt: async ({ token, user }) => {
      // Send properties to the client, like an access_token and user id from a provider.
      if (user) token.user = JSON.parse(JSON.stringify(user));
      return token;
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
  jwt: {
    maxAge: 14 * 24 * 30 * 60 // 2 weeks
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin'
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};

export default NextAuth(authOptions);
