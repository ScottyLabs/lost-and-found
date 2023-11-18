import { Category } from '@prisma/client';
import useZodForm from 'hooks/useZodForm';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useDialogStore from 'stores/DialogStore';
import { Categories } from 'types';
import { trpc } from 'utils/trpc';
import { z } from 'zod';
import { Dialog } from './Dialog';

function SubscriptionsForm() {
  const { manageSubscriptionsDialog } = useDialogStore();
  const context = trpc.useContext();

  const { data: subscriptions, status } = trpc.subscription.list.useQuery();
  const { data: session, status: sessionStatus } = useSession({
    required: true
  });

  const subscriptionCreate = trpc.subscription.create.useMutation({
    onSuccess: () => {
      toast.success('Subscription created!');
      context.subscription.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const methods = useZodForm({
    schema: z
      .object({
        categories: z.array(z.nativeEnum(Category)).max(13)
      })
      .superRefine((data, ctx) => {
        if (
          subscriptions &&
          data.categories.length + subscriptions.length > 2 
        ) {
          ctx.addIssue({
            code: 'custom',
            path: ['categories'],
            message: 'You can only subscribe to two categories.'
          });
        }
      })
  });

  if (status === 'error' || sessionStatus === 'loading')
    return <div>Failed to load</div>;
  if (status === 'loading') return <div>Loading...</div>;

  return (
    <form
      className="flex w-full flex-1 flex-col gap-2 font-bold"
      onSubmit={methods.handleSubmit(async (data) => {
        data.categories.forEach(async (category) => {
          await subscriptionCreate.mutateAsync({ category });
        });
      })}
    >
      <div className="form-control gap-1">
        <label className="label">
          <span className="label-text text-lg">Contact Information</span>
        </label>
        <input
          type="email"
          className="input-bordered input-primary input w-full"
          disabled
          value={session.user.email ?? ''}
        />
      </div>
      <div className="form-control gap-1">
        <label className="label">
          <span className="label-text text-lg">Select Item Category</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.values(Category).map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                className="peer hidden"
                value={category}
                {...methods.register('categories')}
                disabled={subscriptions.some(
                  (subscription) => subscription.category === category
                )}
              />
              <div className="badge badge-lg cursor-pointer peer-checked:badge-accent peer-disabled:cursor-default peer-disabled:badge-ghost">
                {Categories[category]}
              </div>
            </label>
          ))}
        </div>
        <span className="text-xs text-error">
          {methods.formState.errors.categories?.message}
        </span>
      </div>
      <div className="form-control mt-4 flex-1 justify-end gap-2">
        <button
          type="submit"
          className="btn-accent btn-sm btn"
          disabled={!methods.formState.isDirty}
        >
          Subscribe
        </button>
        <button
          type="button"
          onClick={manageSubscriptionsDialog}
          className="btn-outline btn-accent btn-ghost btn-sm btn"
        >
          Manage Subscriptions
        </button>
      </div>
    </form>
  );
}

export default function SubscriptionDialog() {
  const { dialog, clearDialog } = useDialogStore();

  return (
    <Dialog isOpen={dialog === 'subscribe'} onClose={clearDialog}>
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold md:text-3xl">
            Email Notification Sign-Up
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
          <div className="flex items-center gap-2">
            <div className="relative h-20 w-20">
              <Image src="/mail.svg" fill alt="" />
            </div>
            <span className="text-lg font-bold">
              Get alerts when new items are added!
            </span>
          </div>
        </div>
        <div className="prose-neutral prose">
          <strong>
            <ol>
              <li>Select up to two product categories below</li>
              <li>
                You&apos;ll receive a daily email listing newly lost items for
                each category. Email notifications will run for seven
                consecutive days.
              </li>
              <li>
                If you wish to renew notifications after this period, please
                revisit this page.
              </li>
            </ol>
          </strong>
        </div>
        <div className="divider my-0" />
        <SubscriptionsForm />
      </div>
    </Dialog>
  );
}
