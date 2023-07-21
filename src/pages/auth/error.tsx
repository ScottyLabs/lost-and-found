import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type ErrorPageParam = 'Configuration' | 'AccessDenied' | 'Verification';

interface ErrorView {
  status: number;
  heading: string;
  message: JSX.Element;
  signin?: JSX.Element;
}

const errors: Record<Lowercase<ErrorPageParam | 'default'>, ErrorView> = {
  default: {
    status: 200,
    heading: 'Error',
    message: (
      <p>
        <Link className="btn" href="/">
          Lost & Found
        </Link>
      </p>
    )
  },
  configuration: {
    status: 500,
    heading: 'Server error',
    message: (
      <div>
        <p>There is a problem with the server configuration.</p>
        <p>Check the server logs for more information.</p>
      </div>
    )
  },
  accessdenied: {
    status: 403,
    heading: 'Access Denied',
    message: (
      <div>
        <p>You do not have permission to access this page.</p>
      </div>
    )
  },
  verification: {
    status: 403,
    heading: 'Unable to sign in',
    message: (
      <div>
        <p>The sign in link is no longer valid.</p>
        <p>It may have been used already or it may have expired.</p>
      </div>
    ),
    signin: (
      <p>
        <Link className="btn" href="/auth/signin">
          Sign in
        </Link>
      </p>
    )
  }
};

export default function ErrorPage() {
  const {
    query: { error }
  } = useRouter();

  if (typeof error !== 'string') return null;

  const { heading, message, signin } =
    errors[error.toLowerCase() as Lowercase<ErrorPageParam>] ?? errors.default;

  return (
    <div className="mx-4 flex h-screen flex-col items-center justify-center gap-5">
      <div className="relative h-32 w-32">
        <Image src="/logo.svg" alt="" fill className="object-scale-down" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border p-10 shadow-md">
        <h1 className="text-xl font-semibold">{heading}</h1>
        <div className="message">{message}</div>
        <div>{signin}</div>
      </div>
      <div className="max-w-screen-sm rounded-md border border-amber-800 bg-amber-50 p-5 text-amber-900">
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
