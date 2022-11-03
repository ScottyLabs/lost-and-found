import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import env from "env/server.mjs";
import prisma from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ user }) => {
      const isAllowedToSignIn = user.email?.endsWith("andrew.cmu.edu");
      if (isAllowedToSignIn) {
        return true;
      }
      return false;
    },
    session: async ({ session, user }) => {
      // eslint-disable-next-line no-param-reassign
      session.user = JSON.parse(JSON.stringify(user));
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  theme: { logo: "/dog-logo.svg" },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
