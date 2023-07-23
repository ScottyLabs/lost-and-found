import ConfirmItemDeletionDialog from 'components/Dialogs/ConfirmItemDeletionDialog';
import ConfirmUserDeletionDialog from 'components/Dialogs/ConfirmUserDeletionDIalog';
import MassArchiveDialog from 'components/Dialogs/MassArchiveDialog';
import EditUserDialog from 'components/Dialogs/UserEditDialog';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FaSitemap, FaUserFriends } from 'react-icons/fa';
import Navbar from './Navbar';

export default function ManageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ConfirmItemDeletionDialog />
      <MassArchiveDialog />
      <ConfirmUserDeletionDialog />
      <EditUserDialog />

      <div>
        <Navbar />
        <div className="mt-16 flex flex-1">
          <aside className="hidden h-screen w-64 border-r bg-base-100 lg:block">
            <div className="sticky top-0 z-20 flex items-center gap-2 bg-base-100 bg-opacity-90 px-4 py-2 backdrop-blur lg:hidden">
              <Link href="/" className="btn-ghost btn px-2">
                <div className="font-title inline-flex items-end text-3xl text-primary">
                  <span className="text-base-content">CMU</span>
                  <span className="text-sm">Lost & Found</span>
                </div>
              </Link>
            </div>
            <ul className="menu p-4 text-base-content">
              <li className="menu-title">
                <span>Manage</span>
              </li>
              <li>
                <Link href="/manage/items">
                  <FaSitemap /> <span>Items</span>
                </Link>
              </li>
              <li>
                <Link href="/manage/users">
                  <FaUserFriends />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </aside>
          <main className="mx-auto w-full max-w-3xl flex-1 p-10 lg:mx-0">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
