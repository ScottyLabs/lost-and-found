import { Menu, Transition } from '@headlessui/react';
import { Permission } from '@prisma/client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';
import {
  FaCircleNotch,
  FaList,
  FaMailBulk,
  FaNotesMedical,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserGraduate
} from 'react-icons/fa';
import useDialogStore from 'stores/DialogStore';

function AuthWidget() {
  const { data: session, status } = useSession();
  const { subscribeDialog, manageSubscriptionsDialog } = useDialogStore();

  if (status === 'loading') {
    return (
      <div className="btn-disabled btn-ghost btn-circle btn">
        <FaCircleNotch className="animate-spin text-white md:text-black" />;
      </div>
    );
  }

  if (!session) {
    return (
      <button
        type="button"
        className="btn-ghost btn-sm btn gap-2 md:btn-primary"
        onClick={() => signIn('google')}
      >
        <FaSignInAlt />
        <span>Sign in</span>
      </button>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button tabIndex={0} className="flex-0 btn-ghost btn-circle btn">
        <FaUser className="md:text-base-content" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          unmount={false}
          className="absolute right-0 z-50 w-40 origin-top-right rounded-md bg-base-100 p-4 text-base-content shadow-2xl ring-1 ring-black ring-opacity-5"
        >
          {(session.user.permission === Permission.ADMIN ||
            session.user.permission === Permission.MODERATOR) && (
            <>
              <Menu.Item>
                <Link
                  className="flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-accent ui-active:text-accent-content"
                  href="/manage/items"
                >
                  <FaList className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Items</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-accent ui-active:text-accent-content"
                  href="/manage/users"
                >
                  <FaUserGraduate className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Users</span>
                </Link>
              </Menu.Item>
              <div className="divider my-1" />
            </>
          )}

          <Menu.Item>
            <button
              type="button"
              onClick={subscribeDialog}
              className="flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-accent ui-active:text-accent-content"
            >
              <FaMailBulk className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Subscriptions</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              type="button"
              onClick={manageSubscriptionsDialog}
              className="flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-accent ui-active:text-accent-content"
            >
              <FaNotesMedical className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Notifications</span>
            </button>
          </Menu.Item>
          <div className="divider my-1" />
          <Menu.Item>
            <button
              type="button"
              className="flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-accent ui-active:text-accent-content"
              onClick={() => signOut()}
            >
              <FaSignOutAlt className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Sign out</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default AuthWidget;
