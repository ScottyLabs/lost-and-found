/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  FaCircleNotch,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';

function AuthWidget() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="btn-disabled btn-ghost btn-circle btn">
        <FaCircleNotch className="animate-spin text-white md:text-black" />;
      </div>
    );
  }

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="flex-0 btn-ghost btn-circle btn">
        <FaUser className="md:text-black" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact w-36 bg-base-200 p-2 shadow"
      >
        <li>
          {session ? (
            <button
              type="button"
              className="font-bold text-base-content"
              onClick={() => signOut()}
            >
              <span>
                <FaSignOutAlt />
              </span>
              <span>Sign out</span>
            </button>
          ) : (
            <button
              type="button"
              className="font-bold text-base-content"
              onClick={() => signIn()}
            >
              <span>
                <FaSignInAlt />
              </span>
              <span>Sign in</span>
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default AuthWidget;
