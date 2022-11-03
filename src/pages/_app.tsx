/* eslint-disable react/jsx-props-no-spreading */
// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { trpc } from "../utils/trpc";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
