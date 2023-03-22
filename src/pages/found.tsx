import MainLayout from 'components/layout/MainLayout';
import Image from 'next/image';
import { FaLocationArrow, FaMailBulk, FaPhoneAlt } from 'react-icons/fa';

export default function FoundPage() {
  return (
    <MainLayout>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 md:flex-row-reverse">
        <div className="flex flex-1 flex-col gap-4">
          <div className="md:rounded-md md:border md:border-accent md:bg-secondary md:p-4">
            <div className="text-lg font-bold">Found an item?</div>
            <div className="mt-2 text-sm">
              A found item can be taken to the Information Desk at the Cohon
              University Center.
            </div>
          </div>
          <div className="divider md:hidden" />
          <div className="md:rounded-md md:border md:border-accent md:bg-secondary md:p-4">
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
    </MainLayout>
  );
}
