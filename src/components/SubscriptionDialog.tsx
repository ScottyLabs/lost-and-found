/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Category } from '@prisma/client';
import useZodForm from 'lib/form';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Categories } from 'types';
import { trpc } from 'utils/trpc';
import { z } from 'zod';
import useDialogStore from '../stores/DialogStore';
import { Dialog } from './Dialog';

export default function SubscriptionDialog() {
  const { dialog, clearDialog, manageSubscriptionsDialog } = useDialogStore();

  const context = trpc.useContext();

  const { data: subscriptions, status } = trpc.subscription.list.useQuery();
  const { data: session, status: sessionStatus } = useSession({
    required: true
  });

  const subscriptionCreate = trpc.subscription.create.useMutation({
    onSuccess: () => {
      toast('Subscription created!');
      context.subscription.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const methods = useZodForm({
    schema: z
      .object({
        categories: z.array(z.nativeEnum(Category)).max(2)
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
    <Dialog isOpen={dialog === 'subscribe'} onClose={clearDialog}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-2xl font-bold md:text-3xl">
            Item Subscription
          </span>
          <button
            type="button"
            onClick={clearDialog}
            className="btn-ghost btn-circle btn"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
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
            data.categories.forEach(async (category) => {
              await subscriptionCreate.mutateAsync({ category });
            });
          })}
        >
          <div className="form-control gap-1">
            <label className="label">
              <span className="label-text">Email Address</span>
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
          <div className="form-control">
            <button
              type="submit"
              className="btn-accent btn-sm btn"
              disabled={!methods.formState.isDirty}
            >
              Subscribe
            </button>
          </div>
          <div className="divider" />
          <div className="form-control">
            <button
              type="button"
              onClick={manageSubscriptionsDialog}
              className="btn-outline btn-accent btn-ghost btn-sm btn"
            >
              Manage Subscriptions
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
