/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Lato, Nunito } from '@next/font/google';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import useDrawerStore from '../../stores/DrawerStore';
import { Categories, Colors, Locations } from '../../types/index';

const lato = Lato({ subsets: ['latin-ext'], weight: ['400'] });
const nunito = Nunito({ subsets: ['latin-ext'] });

function Drawer() {
  const { drawer } = useDrawerStore();

  if (drawer === 'main')
    return (
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay" />
        <div className="h-screen bg-primary w-80 font-bold">
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
      <div className="h-screen bg-primary w-80 font-bold flex flex-col">
        <div className="text-accent-content justify-between inline-flex w-full items-center bg-accent p-4">
          <h1 className="text-xl uppercase">Filter</h1>
          <button type="button" className="btn font-thin btn-ghost">
            Clear
          </button>
        </div>
        <ul className="menu p-4 text-accent flex-1 w-full flex-nowrap overflow-auto">
          <li>
            <div>
              <div className="collapse collapse-arrow w-full">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">Date Lost</div>
                <div className="collapse-content">
                  <input
                    type="datetime-local"
                    className="input w-full input-ghost"
                  />
                </div>
              </div>
            </div>
          </li>
          <li />
          <li>
            <div>
              <div className="collapse collapse-arrow w-full">
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
              <div className="collapse collapse-arrow w-full">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">Location Found</div>
                <div className="collapse-content">
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Search location found..."
                      className="input input-primary rounded-full w-full"
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
              <div className="collapse collapse-arrow w-full">
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
          <label htmlFor="my-drawer" className="btn btn-accent btn-sm w-full">
            View Items
          </label>
        </div>
      </div>
    </div>
  );
}

export default function MainLayout({ children }: PropsWithChildren) {
  const { mainDrawer, drawer } = useDrawerStore();
  return (
    <div
      className={clsx(
        'drawer',
        lato.className,
        nunito.className,
        drawer === 'filter' && 'drawer-end'
      )}
    >
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar w-full bg-accent text-accent-content">
          <div className="flex-1 lg:hidden">
            <label
              htmlFor="my-drawer"
              onClick={() => mainDrawer()}
              className="btn-ghost btn-square btn"
            >
              <FaBars />
            </label>
          </div>
          <div className="flex-0 mx-2 px-2">
            <FaUser />
          </div>
          <div className="hidden flex-1 lg:block">
            <Image
              src="/logo.svg"
              alt="CMU Lost & Found"
              width={200}
              height={50}
            />
          </div>
        </nav>
        <div className="flex items-center justify-center gap-2 p-4">
          <div className="h-10 w-10">
            <Image
              src="/logo.svg"
              alt="CMU Lost & Found"
              width={200}
              height={50}
            />
          </div>
          <h1 className="text-2xl font-bold">Carnegie Mellon Lost & Found</h1>
        </div>
        <main className="p-2">{children}</main>
      </div>
      <Drawer />
    </div>
  );
}
