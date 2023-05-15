import AuthWidget from 'components/AuthWidget';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import useDrawerStore from 'stores/DrawerStore';

export default function Navbar() {
  const { navigateDrawer } = useDrawerStore();

  return (
    <nav className="navbar fixed top-0 z-10 h-16 bg-accent text-accent-content md:border-b-2 md:bg-base-100">
      <div className="flex-1 md:hidden">
        <button
          type="button"
          onClick={() => navigateDrawer()}
          className="btn-ghost btn-square btn"
        >
          <FaBars />
        </button>
      </div>
      <div className="relative hidden flex-1 items-start md:flex">
        <Link href="/" className="btn-circle btn relative">
          <Image src="/logo.svg" alt="CMU Lost & Found" fill />
        </Link>
      </div>
      <AuthWidget />
    </nav>
  );
}
