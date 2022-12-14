/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import { trpc } from 'utils/trpc';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session}>
        <ToastContainer position="bottom-right" />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default trpc.withTRPC(MyApp);
