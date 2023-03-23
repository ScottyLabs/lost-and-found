/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

import ItemGrid from 'components/ItemGrid';
import MainLayout from 'components/layout/MainLayout';
import ScrollToTop from 'components/ScrollToTop';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaCalendar,
  FaColumns,
  FaSearch,
  FaSearchLocation,
  FaSort,
  FaSquare
} from 'react-icons/fa';
import { Categories, Colors, Locations } from 'types';
import useDialogStore from '../stores/DialogStore';
import useDrawerStore from '../stores/DrawerStore';

export default function HomePage() {
  const { filterDrawer } = useDrawerStore();
  const { subscribeDialog } = useDialogStore();
  const [query, setQuery] = useState('');

  return (
    <MainLayout>
      <ScrollToTop />
      <div className="mx-auto flex flex-col items-center gap-4">
        <div className="relative w-full max-w-3xl text-white">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="focus:shadow-outline p-1 focus:outline-none"
            >
              <FaSearch className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            </button>
          </span>
          <input
            type="text"
            placeholder="Search lost items..."
            className="input-bordered input w-full rounded-full border-4 bg-primary pl-10 font-bold placeholder-accent placeholder-opacity-70"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ul className="menu menu-horizontal w-full justify-between font-bold md:hidden">
          <li className="flex-1">
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1"
            >
              <FaSearchLocation className="h-6 w-6" />
              <span className="text-xs leading-none">Location</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1"
            >
              <FaColumns className="h-6 w-6" />
              <span className="text-xs leading-none">Color</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1"
            >
              <FaCalendar className="h-6 w-6" />
              <span className="text-xs leading-none">Date</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1"
            >
              <FaSquare className="h-6 w-6" />
              <span className="text-xs leading-none">Category</span>
            </button>
          </li>
          <li className="flex-1">
            <label
              htmlFor="my-drawer"
              onClick={() => filterDrawer()}
              className="flex w-full flex-col items-center"
            >
              <FaSort className="h-8 w-8" />
            </label>
          </li>
        </ul>
        <div className="divider m-0 md:hidden" />
        <div className="flex w-full max-w-5xl gap-10">
          <div className="hidden md:block">
            <div className="w-80 self-start rounded-lg bg-primary p-5 text-accent">
              <span className="text-xl font-bold">Filters</span>
              <form className="form-control gap-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Date Lost</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Type here"
                    className="input-bordered input input-sm w-full max-w-xs font-bold"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Item Category</span>
                  </label>
                  <select className="select-bordered select select-sm w-full max-w-xs">
                    {Object.entries(Categories).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Location Lost</span>
                  </label>
                  <select className="select-bordered select select-sm w-full max-w-xs">
                    {Locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Color</span>
                  </label>
                  <select className="select-bordered select select-sm w-full max-w-xs">
                    {Colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn-accent btn-sm btn rounded-full"
                  >
                    <span className="uppercase">Apply Filters</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <ItemGrid query={query} />
            <div className="hidden w-full rounded-lg border border-accent bg-secondary p-4 md:block">
              <div className="prose">
                <h3>Still can&apos;t find it?</h3>
                <ul>
                  <li>
                    <p>
                      Items that are deemed as having a high value or that are
                      identifiable (e.g. student IDs) are not published on our
                      website. Please contact the CUC Information Desk directly.
                    </p>
                    <Link
                      className="btn-accent btn-sm btn shadow-lg"
                      href="/faq"
                    >
                      <span className="uppercase">More Info</span>
                    </Link>
                  </li>
                  <li>
                    <p>
                      Items can turn up at any time. Subscribe to be notified
                      via email about items in your category that get added over
                      the next 7 days.
                    </p>
                    <button
                      type="button"
                      onClick={subscribeDialog}
                      className="btn-accent btn-sm btn shadow-lg"
                    >
                      <span className="uppercase">Subscribe</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="divider m-0 md:hidden" />
        <div className="md:hidden">
          <div className="text-xl font-bold">Can&apos;t find it?</div>
          <div className="mt-2 text-sm">
            High value and identifiable items (e.g. student IDS) are not
            published on our website. Please contact the CUC Information Desk
            directly.
          </div>
        </div>
        <div className="w-full md:hidden">
          <Link href="/faq" className="btn-outline btn-sm btn w-full shadow-lg">
            <span className="uppercase">More Info</span>
          </Link>
        </div>
        <div className="md:hidden">
          <div className="text-xl font-bold">Stay Updated</div>
          <div className="mt-2 text-sm">
            Items can show up at any time. Stay updated via email to see newly
            added items.
          </div>
        </div>
        <div className="w-full md:hidden">
          <button
            type="button"
            onClick={subscribeDialog}
            className="btn-accent btn-sm btn w-full shadow-lg"
          >
            <span className="uppercase">Subscribe</span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
