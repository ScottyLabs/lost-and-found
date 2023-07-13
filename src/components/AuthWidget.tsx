/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Permission } from '@prisma/client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
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
        onClick={() => signIn()}
      >
        <FaSignInAlt />
        <span>Sign in</span>
      </button>
    );
  }

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="flex-0 btn-ghost btn-circle btn">
        <FaUser className="md:text-base-content" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact bg-base-100 p-2 shadow-2xl ring-1 ring-black ring-opacity-5"
      >
        {session.user.permission === Permission.ADMIN && (
          <>
            <li>
              <Link
                className="font-bold text-base-content"
                href="/manage/items"
              >
                <FaList />
                <span>Items</span>
              </Link>
            </li>
            <li>
              <Link
                className="font-bold text-base-content"
                href="/manage/users"
              >
                <FaUserGraduate />
                <span>Users</span>
              </Link>
            </li>
            <li />
          </>
        )}

        <li>
          <button
            type="button"
            onClick={subscribeDialog}
            className="font-bold text-base-content"
          >
            <FaMailBulk />
            <span>Subscriptions</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={manageSubscriptionsDialog}
            className="font-bold text-base-content"
          >
            <FaNotesMedical />
            <span>Notifications</span>
          </button>
        </li>
        <li />
        <li>
          <button
            type="button"
            className="font-bold text-base-content"
            onClick={() => signOut()}
          >
            <FaSignOutAlt />
            <span>Sign out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AuthWidget;
