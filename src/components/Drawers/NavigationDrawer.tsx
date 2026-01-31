import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import useDrawerStore from 'stores/DrawerStore';

export default function NavigationDrawer() {
  const { drawer, clearDrawer } = useDrawerStore();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => clearDrawer();
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [clearDrawer, router]);

  return (
    <Transition appear show={drawer === 'navigate'} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={clearDrawer}
      >
        <div className="flex h-screen w-3/4">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="z-50 h-screen w-full max-w-sm bg-primary font-bold shadow-xl">
              <div className="inline-flex w-full items-center bg-accent p-4">
                <h1 className="text-accent-content">CMU Lost & Found</h1>
              </div>
              <ul className="menu p-4 text-accent">
                <li>
                  <Link href="/">Lost</Link>
                </li>
                <li />
                <li>
                  <Link href="/found">Found</Link>
                </li>
                <li />
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li />
                <li>
                  <Link href="/policies">Policies</Link>
                </li>
              </ul>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
