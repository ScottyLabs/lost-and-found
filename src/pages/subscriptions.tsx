/* eslint-disable jsx-a11y/label-has-associated-control */

import { Category } from '@prisma/client';
import MainLayout from 'components/layout/MainLayout';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FaTrashAlt } from 'react-icons/fa';
import getServerAuthSession from 'server/common/get-server-auth-session';

const SubscriptionData: Array<{
  id: string;
  userId: string;
  category: Category;
  createdAt: Date;
}> = [
  {
    id: '1',
    userId: '1',
    category: 'ELECTRONICS',
    createdAt: new Date()
  },
  {
    id: '2',
    userId: '1',
    category: 'ACCESSORY',
    createdAt: new Date()
  }
];

type SubscriptionProps = {
  subscription: typeof SubscriptionData[0];
};

function Subscription({ subscription }: SubscriptionProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-1 justify-between rounded-lg p-2 shadow-lg">
        <div className="p-3">
          <span className="font-bold">{subscription.category}</span>
        </div>
        <div>
          <span className="text-xs font-thin">
            Date Added:{' '}
            {subscription.createdAt.toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn-error btn-circle btn bg-opacity-50 p-3"
        >
          <FaTrashAlt className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default function SubscriptionsPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold md:text-4xl">
            Manage Subscriptions
          </span>
        </div>
        <div>
          <span className="text-lg font-bold">Saved Searches</span>
        </div>
        <div className="flex flex-col gap-3">
          {SubscriptionData.map((subscription) => (
            <Subscription key={subscription.id} subscription={subscription} />
          ))}
        </div>
        <div>
          <Link href="/subscribe" className="btn-accent btn-sm btn w-full">
            New Item Subscription
          </Link>
        </div>
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
