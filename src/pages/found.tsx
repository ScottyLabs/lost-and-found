import MainLayout from 'components/Layouts/MainLayout';
import { FaLocationArrow, FaMailBulk, FaPhoneAlt } from 'react-icons/fa';
import { NextPageWithLayout } from './_app';

const MAP_LINK =
  'https://www.openstreetmap.org/?mlat=40.4428&mlon=-79.9456#map=17/40.4428/-79.9456';

const Found: NextPageWithLayout = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 md:flex-row-reverse">
      <div className="flex flex-1 flex-col gap-4">
        <div className="md:rounded-md md:border md:border-accent md:p-4">
          <div className="text-lg font-bold">Found an item?</div>
          <div className="mt-2 text-sm">
            A found item can be taken to the Information Desk at the Cohon
            University Center.
          </div>
        </div>
        <div className="divider md:hidden" />
        <div className="md:rounded-md md:border md:border-accent md:p-4">
          <div className="text-lg font-bold">Contact Information</div>
          <div className="flex flex-col items-start gap-2 p-2">
            <div className="flex items-center gap-3">
              <span>
                <FaPhoneAlt />
              </span>
              <span className="text-sm">412-268-2107</span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                <FaMailBulk />
              </span>
              <span className="text-sm">cucinfodesk@andrew.cmu.edu</span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                <FaLocationArrow />
              </span>
              <span className="text-sm">
                University Center, 5032 Forbes Ave
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="my-8 flex min-h-[12rem] items-center justify-center rounded-lg border border-base-content/20 bg-base-200/50 px-4 py-8 text-center text-sm text-primary underline-offset-4 hover:underline md:min-h-[24rem]"
        >
          View Cohon University Center on a map (opens in a new tab)
        </a>
      </div>
    </div>
  );
};

Found.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Found;
