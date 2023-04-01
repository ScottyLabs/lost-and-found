/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import clsx from 'clsx';
import AuthWidget from 'components/AuthWidget';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { FaBars } from 'react-icons/fa';
import useDrawerStore from 'stores/DrawerStore';

export default function MainLayout({ children }: PropsWithChildren) {
  const { navigateDrawer: mainDrawer } = useDrawerStore();
  const router = useRouter();

  return (
    <div>
      <nav className="navbar fixed top-0 z-10 h-16 bg-accent text-accent-content md:border-b-2 md:bg-base-100">
        <div className="flex-1 md:hidden">
          <button
            type="button"
            onClick={() => mainDrawer()}
            className="btn-ghost btn-square btn"
          >
            <FaBars />
          </button>
        </div>
        <div className="relative hidden flex-1 items-start md:flex">
          <Link href="/" className="btn-circle btn relative">
            <Image src="/logo.svg" alt="CMU Lost & Found" fill />
          </Link>
        </div>
        <AuthWidget />
      </nav>
      <div className="mt-16 flex items-center justify-center gap-2 p-4 md:p-10">
        <div className="h-10 w-10 md:hidden">
          <Image
            src="/logo.svg"
            alt="CMU Lost & Found"
            width={200}
            height={50}
          />
        </div>
        <h1 className="text-2xl font-bold md:text-4xl">
          Carnegie Mellon Lost & Found
        </h1>
      </div>
      <div className="mx-auto hidden w-full max-w-3xl justify-between gap-4 font-semibold md:flex">
        <Link
          href="/"
          className={clsx(
            'inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-primary bg-secondary uppercase shadow-lg',
            router.pathname === '/' && '!bg-accent text-accent-content'
          )}
        >
          <span>Lost an Item</span>
        </Link>
        <Link
          href="/found"
          className={clsx(
            'inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-primary bg-secondary uppercase shadow-lg',
            router.pathname === '/found' && '!bg-accent text-accent-content'
          )}
        >
          <span>Found an Item</span>
        </Link>
        <Link
          href="/faq"
          className={clsx(
            'inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-primary bg-secondary uppercase shadow-lg',
            router.pathname === '/faq' && '!bg-accent text-accent-content'
          )}
        >
          <span>FAQ</span>
        </Link>
      </div>
      <main className="p-2 md:my-8">{children}</main>
    </div>
  );
}
