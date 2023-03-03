/* eslint-disable jsx-a11y/label-has-associated-control */

import MainLayout from 'components/layout/MainLayout';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import getServerAuthSession from 'server/common/get-server-auth-session';
import { Categories } from 'types';

export default function SubscribePage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold md:text-4xl">Item Subscription</div>
        <div>
          <div className="flex items-center gap-2">
            <div className="relative h-20 w-20">
              <Image src="/mail.svg" fill alt="" />
            </div>
            <span className="text-lg font-bold">
              Get alerts when new items are added!
            </span>
          </div>
        </div>
        <div className="prose-sm prose">
          <strong>
            <ol>
              <li>Add your information below.</li>
              <li>
                You&apos;ll receive an email at the end of each day filtered to
                your selected category.
              </li>
              <li>
                You&apos;ll receive emails for seven days, and you can
                unsubscribe at any time.
              </li>
            </ol>
          </strong>
        </div>
        <div>
          <span className="text-lg font-bold">Add Item Information</span>
        </div>
        <form className="flex w-full flex-col gap-2 font-bold">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              className="input-bordered input input-sm w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Category</span>
            </label>
            <select className="select-bordered select select-sm w-full bg-primary">
              {Categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="divider" />
          <div className="form-control">
            <button type="button" className="btn-accent btn-sm btn">
              Subscribe
            </button>
          </div>
          <div className="form-control">
            <Link
              href="/subscriptions"
              className="btn-outline btn-accent btn-ghost btn-sm btn"
            >
              Manage Subscriptions
            </Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session)
    return { redirect: { destination: '/auth/signin', permanent: true } };
  return {
    props: {
      session
    }
  };
};
