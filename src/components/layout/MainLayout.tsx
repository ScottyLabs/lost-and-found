/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import useDrawerStore from '../../stores/DrawerStore';
import { Categories, Colors, Locations } from '../../types/index';

function Drawer() {
  const { drawer } = useDrawerStore();

  if (drawer === 'main')
    return (
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay" />
        <div className="h-screen w-80 bg-primary font-bold">
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
      </div>
    );

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay" />
      <div className="flex h-screen w-80 flex-col bg-primary font-bold">
        <div className="inline-flex w-full items-center justify-between bg-accent p-4 text-accent-content">
          <h1 className="text-xl uppercase">Filter</h1>
          <button type="button" className="btn-ghost btn font-thin">
            Clear
          </button>
        </div>
        <ul className="menu w-full flex-1 flex-nowrap overflow-auto p-4 text-accent">
          <li>
            <div>
              <div className="collapse-arrow collapse w-full">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">Date Lost</div>
                <div className="collapse-content">
                  <input
                    type="datetime-local"
                    className="input-ghost input w-full"
                  />
                </div>
              </div>
            </div>
          </li>
          <li />
          <li>
            <div>
              <div className="collapse-arrow collapse w-full">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">Item Category</div>
                <div className="collapse-content">
                  <div>
                    {Categories.map((category) => (
                      <div className="flex items-center gap-2 p-1">
                        <input type="checkbox" className="checkbox" />
                        <label className="label">
                          <span className="label-text">{category}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li />
          <li>
            <div>
              <div className="collapse-arrow collapse w-full">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">Location Found</div>
                <div className="collapse-content">
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Search location found..."
                      className="input-primary input w-full rounded-full"
                    />
                    <div>
                      {Locations.map((location) => (
                        <div className="flex items-center gap-2 p-1">
                          <input type="checkbox" className="checkbox" />
                          <label className="label">
                            <span className="label-text">{location}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li />
          <li>
            <div>
              <div className="collapse-arrow collapse w-full">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">Color</div>
                <div className="collapse-content">
                  {Colors.map((color) => (
                    <div className="flex items-center gap-2 p-1">
                      <input type="checkbox" className="checkbox" />
                      <label className="label">
                        <span className="label-text">{color}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div className="p-4">
          <label htmlFor="my-drawer" className="btn-accent btn-sm btn w-full">
            View Items
          </label>
        </div>
      </div>
    </div>
  );
}

export default function MainLayout({ children }: PropsWithChildren) {
  const { mainDrawer, drawer } = useDrawerStore();
  const router = useRouter();
  return (
    <div className={clsx('drawer', drawer === 'filter' && 'drawer-end')}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar bg-accent text-accent-content md:border-b-2 md:bg-base-100">
          <div className="flex-1 md:hidden">
            <label
              htmlFor="my-drawer"
              onClick={() => mainDrawer()}
              className="btn-ghost btn-square btn"
            >
              <FaBars />
            </label>
          </div>
          <div className="relative hidden flex-1 items-start md:flex">
            <Link href="/" className="btn-circle btn relative">
              <Image src="/logo.svg" alt="CMU Lost & Found" fill />
            </Link>
          </div>
          <div className="flex-0 btn-ghost btn-circle btn">
            <FaUser className="md:text-black" />
          </div>
        </nav>
        <div className="flex items-center justify-center gap-2 p-4 md:p-10">
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
      <Drawer />
    </div>
  );
}
