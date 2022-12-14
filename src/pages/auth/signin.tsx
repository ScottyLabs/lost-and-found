import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { FaSignInAlt } from 'react-icons/fa';

export default function SigninPage() {
  return (
    <div className="mx-auto flex h-screen max-w-screen-md flex-col items-center justify-center gap-5">
      <div className="relative h-32 w-32">
        <Image
          src="/dog-logo.svg"
          alt="logo"
          fill
          className="object-scale-down"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border p-10 shadow-md">
        <h1 className="text-xl font-semibold">
          Please login to access this site
        </h1>
        <button
          type="button"
          className="btn-primary btn-md btn"
          onClick={() =>
            signIn('google', {
              callbackUrl:
                new URLSearchParams(window.location.search).get(
                  'callbackUrl'
                ) ?? window.location.origin
            })
          }
        >
          <span className="mr-5">
            <FaSignInAlt className="h-5 w-5" />
          </span>
          Sign in with CMU SSO
        </button>
      </div>
      <div className="flex flex-col gap-1 rounded-md border border-amber-800 bg-amber-50 p-5 text-amber-900">
        <p>
          If you are not affiliated with Carnegie Mellon University, please
          reach out to the Cohon University Center Lost &amp; Found Desk by
          emailing{' '}
          <a
            className="link-accent link"
            href="mailto:cucinfodesk@andrew.cmu.edu"
          >
            cucinfodesk@andrew.cmu.edu
          </a>{' '}
          or by calling 412-268-2107.
        </p>
      </div>
    </div>
  );
}
