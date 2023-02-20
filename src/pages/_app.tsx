/* eslint-disable react/jsx-props-no-spreading */

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import { Lato } from '@next/font/google';
import clsx from 'clsx';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { trpc } from 'utils/trpc';

const lato = Lato({
  subsets: ['latin-ext'],
  weight: ['400'],
  variable: '--font-lato'
});

function FontProvider({ children }: PropsWithChildren<{}>) {
  return (
    <div className={clsx(lato.className)}>
      <div className="antialiased">{children}</div>
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider>
      <FontProvider>
        <SessionProvider session={pageProps.session}>
          <ToastContainer position="bottom-right" />
          <Component {...pageProps} />
        </SessionProvider>
      </FontProvider>
    </ThemeProvider>
  );
}

export default trpc.withTRPC(MyApp);
