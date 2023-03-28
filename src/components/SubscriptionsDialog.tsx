/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Subscription } from '@prisma/client';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { trpc } from 'utils/trpc';
import useDialogStore from '../stores/DialogStore';
import { Dialog } from './Dialog';

type SubscriptionItemProps = {
  subscription: Subscription;
};

function SubscriptionItem({
  subscription: { id, createdAt, category }
}: SubscriptionItemProps) {
  const context = trpc.useContext();

  const subscriptionDelete = trpc.subscription.delete.useMutation({
    onSuccess: () => {
      toast('Subscription deleted!');
      context.subscription.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-1 justify-between rounded-lg p-2 shadow-lg">
        <div className="p-3">
          <span className="font-bold text-neutral">{category}</span>
        </div>
        <div>
          <span className="text-xs font-thin">
            Date Added:{' '}
            {createdAt.toLocaleDateString('en-US', {
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
          onClick={() => subscriptionDelete.mutate({ id })}
        >
          <FaTrashAlt className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default function SubscriptionsDialog() {
  const { dialog, clearDialog, subscribeDialog } = useDialogStore();
  const { data: subscriptions, status } = trpc.subscription.list.useQuery();

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Failed to load</div>;

  return (
    <Dialog isOpen={dialog === 'manageSubscriptions'} onClose={clearDialog}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold md:text-3xl">
            Manage Notifications
          </span>
          <button
            type="button"
            onClick={clearDialog}
            className="btn-ghost btn-circle btn"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <div className="divider my-0" />
        <div>
          <span className="text-lg font-bold">Saved Searches</span>
        </div>
        <div className="flex flex-col gap-3">
          {subscriptions.map((subscription) => (
            <SubscriptionItem
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={subscribeDialog}
            className="btn-accent btn-sm btn w-full"
          >
            New Item Subscription
          </button>
        </div>
      </div>
    </Dialog>
  );
}
