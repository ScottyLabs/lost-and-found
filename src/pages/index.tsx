/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import ItemGrid from 'components/ItemGrid';
import MainLayout from 'components/layout/MainLayout';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import {
  FaCalendar,
  FaColumns,
  FaSearch,
  FaSearchLocation,
  FaSort,
  FaSquare
} from 'react-icons/fa';
import getServerAuthSession from 'server/common/get-server-auth-session';
import useDrawerStore from '../stores/DrawerStore';

export default function HomePage() {
  const { filterDrawer } = useDrawerStore();
  const [query, setQuery] = useState('');

  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full text-white">
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
            className="input w-full rounded-full bg-primary pl-10 font-bold placeholder-accent font-display placeholder-opacity-70"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ul className="menu menu-horizontal justify-between w-full font-bold">
          <li className="flex-1">
            <button
              type="button"
              className="w-full flex flex-col items-center gap-1"
            >
              <FaSearchLocation className="w-6 h-6" />
              <span className="text-xs leading-none">Location</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              className="w-full flex flex-col items-center gap-1"
            >
              <FaColumns className="w-6 h-6" />
              <span className="text-xs leading-none">Color</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              className="w-full flex flex-col items-center gap-1"
            >
              <FaCalendar className="w-6 h-6" />
              <span className="text-xs leading-none">Date</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              className="w-full flex flex-col items-center gap-1"
            >
              <FaSquare className="w-6 h-6" />
              <span className="text-xs leading-none">Category</span>
            </button>
          </li>
          <li className="flex-1">
            <label
              htmlFor="my-drawer"
              onClick={() => filterDrawer()}
              className="w-full flex flex-col items-center"
            >
              <FaSort className="w-8 h-8" />
            </label>
          </li>
        </ul>
        <div className="divider m-0" />
        <ItemGrid query={query} />
        <div className="divider m-0" />
        <div>
          <div className="text-xl font-bold">Can&apos;t find it?</div>
          <div className="mt-2 text-sm">
            High value and identifiable items (e.g. student IDS) are not
            published on our website. Please contact the CUC Information Desk
            directly.
          </div>
        </div>
        <div className="w-full">
          <button
            type="button"
            className="btn-outline btn-sm btn w-full shadow-lg"
          >
            <span className="uppercase">More Info</span>
          </button>
        </div>
        <div>
          <div className="text-xl font-bold">Stay Updated</div>
          <div className="mt-2 text-sm">
            Items can show up at any time. Subscribe to be notified via email
            about items in your category that get added in the next 7 days.
          </div>
        </div>
        <div className="w-full">
          <button
            type="button"
            className="btn-accent btn-sm btn w-full shadow-lg"
          >
            <span className="uppercase">Subscribe</span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session)
    return { redirect: { destination: '/auth/signin', permanent: true } };
  return {
    props: {
      session
    }
  };
};
