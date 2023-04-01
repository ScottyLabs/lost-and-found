/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import useDrawerStore from 'stores/DrawerStore';

export default function NavigationDrawer() {
  const { drawer, clearDrawer } = useDrawerStore();

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
              </ul>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
