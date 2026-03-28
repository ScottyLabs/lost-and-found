import MainLayout from 'components/Layouts/MainLayout';
import Image from 'next/image';
import { FaLocationArrow, FaMailBulk, FaPhoneAlt } from 'react-icons/fa';
import { NextPageWithLayout } from './_app';

const Found: NextPageWithLayout = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <div className="flex w-full flex-col items-center gap-4 md:flex-row-reverse">
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
        <div className="flex-1">
          <Image
            className="my-8 rounded-lg border"
            alt="Cohon University Center"
            src="/cuc.png"
            width={384}
            height={384}
          />
        </div>
      </div>
      <div className="w-full rounded-md border border-yellow-400 bg-yellow-100 p-3 text-sm text-yellow-800">
        If you have any questions or concerns, please fill out{' '}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdwzFOafF1NHMO2RMIP5h7db-AaQmLx7fP6Xt4FDY5pAWkqYQ/viewform?pli=1"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline"
        >
          this form
        </a>
        .
      </div>
    </div>
  );
};

Found.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Found;
