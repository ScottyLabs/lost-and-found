import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MainHeader() {
  const router = useRouter();
  const { data, status } = useSession({ required: true });
  const { theme, setTheme } = useTheme();
  return (
    <header className="mx-auto flex w-full justify-between p-5">
      <div className="flex flex-grow items-center gap-4">
        <Link className="relative h-32 w-32" href="/">
          <Image
            src="/dog-logo.svg"
            alt="CMU Lost and Found Logo"
            fill
            className="object-scale-down"
          />
        </Link>
        <div className="font-semibold">
          <h1 className="text-3xl">Carnegie Mellon University</h1>
          <h2 className="text-xl">
            Lost and Found Website - {router.pathname}
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {status === 'loading' ? (
          <div className="relative h-8 w-8" />
        ) : (
          <div className="dropdown-end dropdown">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              className="online btn-ghost btn-circle avatar btn"
            >
              <Image
                src={data.user?.image ?? 'default_image.png'}
                alt={data.user?.name ?? ''}
                layout="fill"
                className="rounded-full object-scale-down"
              />
            </label>

            <ul
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact w-36 bg-base-200 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/policies">Policies</Link>
              </li>
              {/* Make permission-ified */}
              <hr className="my-1" />
              <li>
                <Link href="/accounts">Accounts</Link>
              </li>
              <li>
                <Link href="/admin">Admin</Link>
              </li>
              <hr className="my-1" />
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (theme === 'dark') setTheme('light');
                    else setTheme('dark');
                  }}
                >
                  Toggle theme
                </button>
              </li>
              <hr className="my-1" />
              <li>
                <button type="button" onClick={() => signOut()}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
