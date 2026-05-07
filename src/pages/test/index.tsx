import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { trpc } from 'utils/trpc';

export const getServerSideProps: GetServerSideProps = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return { notFound: true };
  }
  return { props: {} };
};

export default function TestPage() {
  const [loadSnapshot, setLoadSnapshot] = useState(false);
  const { data, isLoading, isError, error, refetch } =
    trpc.test.snapshot.useQuery(undefined, { enabled: loadSnapshot });

  return (
    <>
      <Head>
        <title>Test — DB snapshot</title>
      </Head>
      <div className="mx-auto max-w-5xl p-6">
        <h1 className="mb-2 text-xl font-bold">Development test suite</h1>
        <p className="mb-6 text-sm text-gray-500">
          This route only exists when <code>NODE_ENV=development</code>.
        </p>
        <button
          type="button"
          className="btn-primary btn-sm btn"
          disabled={isLoading}
          onClick={() => {
            if (loadSnapshot) void refetch();
            else setLoadSnapshot(true);
          }}
        >
          {isLoading ? 'Loading…' : data ? 'Refresh database' : 'View database'}
        </button>
        {isError ? (
          <p className="mt-4 text-sm text-error">
            {error?.message ?? 'Failed to load snapshot'}
          </p>
        ) : null}
        {data ? (
          <pre className="mt-6 max-h-[70vh] overflow-auto rounded-lg bg-base-200 p-4 text-xs">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : null}
      </div>
    </>
  );
}
