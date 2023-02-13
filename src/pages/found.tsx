import MainLayout from 'components/layout/MainLayout';
import Image from 'next/image';
import { FaLocationArrow, FaMailBulk, FaPhoneAlt } from 'react-icons/fa';

export default function FoundPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <div>
          <div className="text-lg font-bold">Found an item?</div>
          <div className="mt-2 text-sm">
            A found item can be taken to the Information Desk at the Cohon
            University Center.
          </div>
        </div>
        <div className="divider" />
        <div className="w-full">
          <div className="text-lg font-bold">Contact Information</div>
          <div className="p-2 flex flex-col gap-2 items-start">
            <div className="flex items-center gap-3">
              <span>
                <FaPhoneAlt />
              </span>
              <span className="text-sm font-display">412-268-2107</span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                <FaMailBulk />
              </span>
              <span className="text-sm font-display">
                cucinfodesk@andrew.cmu.edu
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                <FaLocationArrow />
              </span>
              <span className="text-sm font-display">
                University Center, 5032 Forbes Ave
              </span>
            </div>
          </div>
        </div>
        <div>
          <Image
            className="rounded-lg border my-8"
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
