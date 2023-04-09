/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  Building,
  Category,
  Color,
  ItemInteraction,
  Value
} from '@prisma/client';
import MainLayout from 'components/layout/MainLayout';
import useZodForm from 'hooks/useZodForm';
import { ItemSchema } from 'lib/schemas';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { trpc } from 'utils/trpc';

export default function Create() {
  const router = useRouter();
  const { itemId } = router.query;
  const item = trpc.item.byId.useQuery(
    { id: itemId as string },
    {
      enabled: typeof itemId === 'string'
    }
  );

  const methods = useZodForm({
    schema: ItemSchema,
    defaultValues: item.data
  });

  const context = trpc.useContext();
  const auditCreateMutation = trpc.audit.create.useMutation();
  const itemMutation = trpc.item.update.useMutation({
    onError: (e) => toast(e.data?.zodError?.message),
    onSuccess: async (change) => {
      await auditCreateMutation.mutateAsync({
        interaction: ItemInteraction.EDIT,
        itemId: change.id
      });
      await context.item.invalidate();
      await context.audit.invalidate();
      methods.reset();
      router.push('/manage');
      toast('Item Updated');
    }
  });

  if (typeof itemId !== 'string') return <p>Invalid Item ID</p>;
  if (item.isLoading) return <p>Loading...</p>;
  if (item.error) return <p>Error...</p>;
  if (!item) return <p>Could not find item {itemId}</p>;

  return (
    <MainLayout>
      <h3 className="mx-auto w-full max-w-2xl text-2xl font-bold">Edit Item</h3>
      <div className="divider mx-auto max-w-2xl" />
      <form
        onSubmit={methods.handleSubmit(
          async (data) => {
            await itemMutation.mutateAsync({ id: itemId, data });
            methods.reset();
          },
          async (e) => {
            toast(
              JSON.stringify(
                Object.entries(e).map(([key, value]) => ({
                  key,
                  value: value?.message
                }))
              )
            );
          }
        )}
        className="form-control mx-auto w-full max-w-2xl gap-2"
      >
        <div>
          <label className="label">
            <span className="label-text">Item Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input-bordered input input-sm w-full"
            {...methods.register('name')}
          />
          <label className="text-xs text-error">
            {methods.formState.errors.name?.message?.toString()}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Date Found</span>
          </label>
          <input
            type="datetime-local"
            placeholder="Type here"
            className="input-bordered input input-sm w-full"
            {...methods.register('foundDate')}
          />
          <label className="text-xs text-error">
            {methods.formState.errors.foundDate?.message?.toString()}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Building Found</span>
          </label>
          <select
            className="select-bordered select select-sm w-full"
            {...methods.register('foundBuilding')}
          >
            {Object.values(Building).map((building) => (
              <option key={building}>{building}</option>
            ))}
          </select>
          <label className="text-xs text-error">
            {methods.formState.errors.foundBuilding?.message?.toString()}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Location Found</span>
          </label>
          <input
            placeholder="Type here"
            className="input-bordered input input-sm w-full"
            {...methods.register('foundDescription')}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Short Description</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input-bordered input input-sm w-full"
            {...methods.register('shortDescription')}
          />
          <label className="text-xs text-error">
            {methods.formState.errors.shortDescription?.message?.toString()}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Categories</span>
          </label>
          <select
            multiple
            className="select-bordered select"
            {...methods.register('categories')}
          >
            {Object.values(Category).map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <label className="text-xs text-error">
            {methods.formState.errors.categories?.message?.toString()}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Color</span>
          </label>
          <select
            className="select-bordered select"
            {...methods.register('color')}
          >
            {Object.values(Color).map((color) => (
              <option key={color}>{color}</option>
            ))}
          </select>
          <label className="text-xs text-error">
            {methods.formState.errors.color?.message?.toString()}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Value</span>
          </label>
          {Object.values(Value).map((value) => (
            <label key={value} className="label cursor-pointer">
              <input
                type="radio"
                className="radio radio-sm"
                {...methods.register('value')}
                value={value}
              />
              <span className="label-text-alt">{value}</span>
            </label>
          ))}
          <label className="text-xs text-error">
            {methods.formState.errors.value?.message?.toString()}
          </label>
        </div>
        <div>
          <label className="label cursor-pointer">
            <span className="label-text">Identifiable?</span>
            <input
              type="checkbox"
              className="checkbox"
              {...methods.register('identifiable')}
            />
          </label>
          <label className="text-xs text-error">
            {methods.formState.errors.identifiable?.message?.toString()}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Retrieve From</span>
          </label>
          <select
            className="select-bordered select select-sm w-full"
            {...methods.register('retrieveBuilding')}
          >
            {Object.values(Building).map((building) => (
              <option key={building}>{building}</option>
            ))}
          </select>
          <label className="text-xs text-error">
            {methods.formState.errors.retrieveBuilding?.message?.toString()}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Notes</span>
          </label>
          <textarea
            className="textarea-bordered textarea h-24 w-full"
            placeholder="Type here"
            {...methods.register('longDescription')}
          />
          <label className="text-xs text-error">
            {methods.formState.errors.longDescription?.message?.toString()}
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={!methods.formState.isDirty}
            className="btn-success btn w-full"
          >
            Update
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
