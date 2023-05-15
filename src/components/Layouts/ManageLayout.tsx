import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FaHouseUser, FaSitemap, FaUserFriends } from 'react-icons/fa';
import Navbar from './Navbar';
import ManageDrawer from 'components/Drawers/ManageDrawer';

export default function ManageLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <div className="mt-16 flex flex-1">
        <ManageDrawer />
        <main className="flex-1 p-2 md:my-8">{children}</main>
      </div>
    </div>
  );
}
