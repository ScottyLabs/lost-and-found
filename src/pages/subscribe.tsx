/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Category } from '@prisma/client';
import clsx from 'clsx';
import MainLayout from 'components/layout/MainLayout';
import useZodForm from 'lib/form';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import getServerAuthSession from 'server/common/get-server-auth-session';
import { Categories } from 'types';
import { trpc } from 'utils/trpc';
import { z } from 'zod';

export default function SubscribePage() {
  const { data: subscriptions, status } = trpc.subscription.list.useQuery();

  const methods = useZodForm({
    schema: z.object({
      email: z.string().email(),
      categories: z.array(z.nativeEnum(Category)).max(2)
    })
  });

  if (status === 'error') return <div>Failed to load</div>;
  if (status === 'loading') return <div>Loading...</div>;

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
        <form
          className="flex w-full flex-col gap-2 font-bold"
          onSubmit={methods.handleSubmit(async (data) => {
            // eslint-disable-next-line no-console
            console.log(data);
          })}
        >
          <div className="form-control gap-1">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              className="input-bordered input-primary input w-full"
              {...methods.register('email')}
            />
            <span className="text-xs text-error">
              {methods.formState.errors.email?.message}
            </span>
          </div>
          <div className="form-control gap-1">
            <label className="label">
              <span className="label-text">Item Category</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.values(Category).map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    className="peer hidden"
                    value={category}
                    {...methods.register('categories')}
                  />
                  <span
                    className={clsx(
                      'badge badge-lg cursor-pointer peer-checked:text-accent-content peer-checked:badge-accent',
                      subscriptions.some(
                        (subscription) => subscription.category === category
                      ) && 'badge-accent'
                    )}
                  >
                    {Categories[category]}
                  </span>
                </label>
              ))}
            </div>
            <span className="text-xs text-error">
              {methods.formState.errors.categories?.message}
            </span>
          </div>
          <div className="divider" />
          <div className="form-control">
            <button type="submit" className="btn-accent btn-sm btn">
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
