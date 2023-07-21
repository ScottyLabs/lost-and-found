import FilterWidget from 'components/FilterWidget';
import ItemGrid from 'components/ItemGrid';
import MainLayout from 'components/Layouts/MainLayout';
import ScrollToTop from 'components/ScrollToTop';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaCalendar,
  FaColumns,
  FaSearch,
  FaSearchLocation,
  FaSlidersH,
  FaSquare
} from 'react-icons/fa';
import useActiveFilterStore from 'stores/ActiveFilterStore';
import useDialogStore from 'stores/DialogStore';
import useDrawerStore from 'stores/DrawerStore';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { filterDrawer } = useDrawerStore();
  const { subscribeDialog } = useDialogStore();
  const { setFilter } = useActiveFilterStore();
  const [query, setQuery] = useState('');

  return (
    <>
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
              onClick={() => {
                filterDrawer();
              }}
            >
              <FaSearchLocation className="h-6 w-6" />
              <span className="text-xs leading-none">Location</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1"
              onClick={() => {
                filterDrawer();
              }}
            >
              <FaColumns className="h-6 w-6" />
              <span className="text-xs leading-none">Color</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1"
              onClick={() => {
                filterDrawer();
              }}
            >
              <FaCalendar className="h-6 w-6" />
              <span className="text-xs leading-none">Date</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1"
              onClick={() => {
                filterDrawer();
              }}
            >
              <FaSquare className="h-6 w-6" />
              <span className="text-xs leading-none">Category</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              className="flex w-full flex-col items-center"
              onClick={() => filterDrawer()}
            >
              <FaSlidersH className="h-6 w-6" />
            </button>
          </li>
        </ul>
        <div className="divider m-0 md:hidden" />
        <div className="flex w-full max-w-5xl gap-10">
          <div className="hidden md:block">
            <FilterWidget />
          </div>
          <div className="flex w-full flex-col gap-4">
            <ItemGrid query={query} />
            <div className="hidden h-full w-full rounded-lg border border-accent p-4 md:block">
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
        <div className="w-full md:hidden">
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
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
