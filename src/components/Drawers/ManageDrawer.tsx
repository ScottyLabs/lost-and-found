import { Dialog, Transition } from '@headlessui/react';
import { useWindowSize } from 'hooks/useWindowSize';
import Link from 'next/link';
import { Fragment } from 'react';
import { FaHouseUser, FaSitemap, FaUserFriends } from 'react-icons/fa';
import useDrawerStore from 'stores/DrawerStore';

export default function ManageDrawer() {
  const { drawer, clearDrawer } = useDrawerStore();
  const { width } = useWindowSize();

  return (
    <Transition
      appear
      show={drawer === 'manage' || (width ?? 0) >= 500}
      as={Fragment}
    >
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
            <aside className="w-80 border-r bg-base-100">
              <div className="sticky top-0 z-20 hidden items-center gap-2 bg-base-100 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ">
                <Link href="/" className="btn-ghost btn px-2">
                  <div className="font-title inline-flex items-end text-lg text-primary transition-all duration-200 md:text-3xl">
                    <span className="text-base-content">CMU</span>
                    <span className="text-sm">Lost & Found</span>
                  </div>
                </Link>
              </div>
              <ul className="menu p-4 text-base-content">
                <li className="menu-title">
                  <span>Manage</span>
                </li>
                <li>
                  <Link href="/manage">
                    <FaSitemap /> <span>Items</span>
                  </Link>
                </li>
                <li>
                  <Link href="/accounts">
                    <FaUserFriends />
                    <span>Users</span>
                  </Link>
                </li>
                <li />
                <li className="menu-title">
                  <span>Subscriptions</span>
                </li>
                <li>
                  <Link href="/manage">
                    <FaHouseUser />
                    <span>Manage</span>
                  </Link>
                </li>
              </ul>
            </aside>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
