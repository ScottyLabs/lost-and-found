import Image from 'next/image';
import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <div className="mt-16 flex items-center justify-center gap-2 p-4 md:p-10">
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
      <main className="p-2 md:my-8">{children}</main>
    </div>
  );
}
