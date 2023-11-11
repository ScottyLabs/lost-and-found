/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  Category,
  Color,
  ItemInteraction,
  Location,
  Value
} from '@prisma/client';
import MyListbox from 'components/Form/Listbox';
import ManageLayout from 'components/Layouts/ManageLayout';
import useZodForm from 'hooks/useZodForm';
import { ItemCreateSchema } from 'lib/schemas';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { toast } from 'react-toastify';
import { Categories, Colors, Locations } from 'types';
import { trpc } from 'utils/trpc';

const CreateItem: NextPageWithLayout = () => {
  const context = trpc.useContext();
  const router = useRouter();
  const auditCreateMutation = trpc.audit.create.useMutation();
  const itemMutation = trpc.item.create.useMutation({
    onError: (e) => toast.error(e.data?.zodError),
    onSuccess: async (item) => {
      await auditCreateMutation.mutateAsync({
        interaction: ItemInteraction.CREATE,
        itemId: item.id
      });
      await context.item.invalidate();
      router.push('/manage/items');
      toast.success('Item Created');
    }
  });

  const methods = useZodForm({ schema: ItemCreateSchema });

  return (
    <div className="mx-auto max-w-lg">
      <h3 className="text-2xl font-bold">Add Item</h3>
      <div className="divider" />
      <form
        onSubmit={methods.handleSubmit(async (data) => {
          await itemMutation.mutateAsync(data);
          methods.reset();
        })}
        className="form-control gap-2"
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
            {methods.formState.errors.name?.message}
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
            {methods.formState.errors.foundDate?.message}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Building Found</span>
          </label>
          <MyListbox
            values={Object.values(Location)}
            displayValue={(prop) => Locations[prop]}
            keyValue={(prop) => prop}
            name="foundLocation"
            control={methods.control}
            placeholder="Select a location"
          />
          <label className="text-xs text-error">
            {methods.formState.errors.foundLocation?.message}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Location Found Details</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input-bordered input input-sm w-full"
            {...methods.register('foundDescription')}
          />
          <label className="text-xs text-error">
            {methods.formState.errors.foundDescription?.message}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Short Item Description</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input-bordered input input-sm w-full"
            {...methods.register('shortDescription')}
          />
          <label className="text-xs text-error">
            {methods.formState.errors.shortDescription?.message}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Categories</span>
          </label>
          <MyListbox
            values={Object.values(Category)}
            displayValue={(prop) => Categories[prop]}
            keyValue={(prop) => prop}
            name="categories"
            control={methods.control}
            placeholder="Select categories"
            multiple
          />
          <label className="text-xs text-error">
            {methods.formState.errors.categories?.message}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Color</span>
          </label>
          <MyListbox
            values={Object.values(Color)}
            displayValue={(prop) => Colors[prop]}
            keyValue={(prop) => prop}
            name="color"
            control={methods.control}
            placeholder="Select color"
          />
          <label className="text-xs text-error">
            {methods.formState.errors.color?.message}
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
            {methods.formState.errors.value?.message}
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
            {methods.formState.errors.identifiable?.message}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Retrieve From</span>
          </label>
          <MyListbox
            values={Object.values(Location)}
            displayValue={(prop) => Locations[prop]}
            keyValue={(prop) => prop}
            name="retrieveLocation"
            control={methods.control}
            placeholder="Select a location"
          />
          <label className="text-xs text-error">
            {methods.formState.errors.retrieveLocation?.message}
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Item Storage Location</span>
          </label>
          <input
            type="text"
            placeholder="Ex. Closet or Vault"
            className="input-bordered input input-sm w-full"
            {...methods.register('itemLocation')}
          />
          <label className="text-xs text-error">
            {methods.formState.errors.itemLocation?.message}
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
            {methods.formState.errors.longDescription?.message}
          </label>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/manage/items')}
            className="btn-ghost btn"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary btn">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

CreateItem.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default CreateItem;
