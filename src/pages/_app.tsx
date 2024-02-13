import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import SubscriptionDialog from 'components/Dialogs/SubscriptionDialog';
import SubscriptionsDialog from 'components/Dialogs/SubscriptionsDialog';
import FilterDrawer from 'components/Drawers/FilterDrawer';
import NavigationDrawer from 'components/Drawers/NavigationDrawer';
import { NextPage } from 'next';
import { ThemeProvider } from 'next-themes';
import { Lato } from 'next/font/google';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import { AppProps } from 'next/app';
import { trpc } from 'utils/trpc';

const lato = Lato({
  subsets: ['latin-ext'],
  weight: ['400'],
  variable: '--font-lato'
});

function FontProvider({ children }: PropsWithChildren) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${lato.style.fontFamily};
          }
        `}
      </style>
      <div className="antialiased">{children}</div>
    </>
  );
}

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const MyApp = ({
  Component,
  pageProps
}: AppProps & { Component: NextPageWithLayout }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider>
      <FontProvider>
        <ClerkProvider>
          <Head>
            <title>CMU Lost & Found</title>
            <link rel="shortcut icon" href="/logo.svg" />
          </Head>
          <ToastContainer position="bottom-right" />
          <NavigationDrawer />
          <FilterDrawer />
          <SubscriptionDialog />
          <SubscriptionsDialog />
          {getLayout(<Component {...pageProps} />)}
        </ClerkProvider>
      </FontProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
