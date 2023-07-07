import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.css';

import ConfirmItemDeletionDialog from 'components/Dialogs/ConfirmItemDeletionDialog';
import MassArchiveDialog from 'components/Dialogs/MassArchiveDialog';
import SubscriptionDialog from 'components/Dialogs/SubscriptionDialog';
import SubscriptionsDialog from 'components/Dialogs/SubscriptionsDialog';
import FilterDrawer from 'components/Drawers/FilterDrawer';
import NavigationDrawer from 'components/Drawers/NavigationDrawer';
import { NextPage } from 'next';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Lato } from 'next/font/google';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
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

type AppPropsWithLayoutAndSession = AppProps<{
  session: Session;
}> & {
  Component: NextPageWithLayout;
};
const MyApp = ({ Component, pageProps }: AppPropsWithLayoutAndSession) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider>
      <FontProvider>
        <SessionProvider session={pageProps.session}>
          <Head>
            <title>CMU Lost & Found</title>
            <link rel="shortcut icon" href="/logo.svg" />
          </Head>
          <ToastContainer position="bottom-right" />
          <NavigationDrawer />
          <FilterDrawer />
          <SubscriptionDialog />
          <SubscriptionsDialog />
          <ConfirmItemDeletionDialog />
          <MassArchiveDialog />
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </FontProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
