import { PropsWithChildren } from 'react';
import MainHeader from './MainHeader';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
    <MainHeader />
    <div className="mx-auto w-full max-w-screen-xl flex-col p-8">
      <main className="flex w-full flex-col items-center">{children}</main>
      {/* <MainFooter /> */}
    </div>
    </>
  );
}
