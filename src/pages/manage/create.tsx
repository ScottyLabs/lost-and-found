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
import ManageLayout from 'components/Layouts/ManageLayout';
import useZodForm from 'hooks/useZodForm';
import { ItemCreateSchema } from 'lib/schemas';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { toast } from 'react-toastify';
import { trpc } from 'utils/trpc';

const CreateItem: NextPageWithLayout = () => {
  const context = trpc.useContext();
  const router = useRouter();
  const auditCreateMutation = trpc.audit.create.useMutation();
  const itemMutation = trpc.item.create.useMutation({
    onError: (e) => toast.error(e.data?.zodError?.message ?? e.toString()),
    onSuccess: async (item) => {
      await auditCreateMutation.mutateAsync({
        interaction: ItemInteraction.CREATE,
        itemId: item.id
      });
      await context.item.invalidate();
      router.push('/manage');
      toast.success('Item Created');
    }
  });

  const methods = useZodForm({ schema: ItemCreateSchema });

  return (
    <>
      <h3 className="text-2xl font-bold">Add Item</h3>
      <hr />
      <form
        onSubmit={methods.handleSubmit(
          async (data) => {
            await itemMutation.mutateAsync(data);
            methods.reset();
          },
          async (e) => {
            toast.error(
              JSON.stringify(
                Object.entries(e).map(([key, value]) => ({
                  key,
                  value: value?.message
                }))
              )
            );
          }
        )}
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
          <select
            className="select-bordered select select-sm w-full"
            {...methods.register('foundBuilding')}
          >
            {Object.values(Building).map((building) => (
              <option key={building}>{building}</option>
            ))}
          </select>
          <label className="text-xs text-error">
            {methods.formState.errors.foundBuilding?.message}
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
            {methods.formState.errors.shortDescription?.message}
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
            {methods.formState.errors.categories?.message}
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
          <select
            className="select-bordered select select-sm w-full"
            {...methods.register('retrieveBuilding')}
          >
            {Object.values(Building).map((building) => (
              <option key={building}>{building}</option>
            ))}
          </select>
          <label className="text-xs text-error">
            {methods.formState.errors.retrieveBuilding?.message}
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
        <div>
          <button type="submit" className="btn-success btn w-full">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

CreateItem.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default CreateItem;
