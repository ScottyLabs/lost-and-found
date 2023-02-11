/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  Building,
  Category,
  Item,
  ItemInteraction,
  Value
} from '@prisma/client';
import { toast } from 'react-toastify';
import { trpc } from 'utils/trpc';
import clsx from 'clsx';
import { ItemEditSchema } from 'lib/schemas';
import useZodForm from 'hooks/useZodForm';

type Props = {
  item: Item;
};

function ItemEditModal({ item }: Props) {
  const context = trpc.useContext();

  const clearForm = () => {
    (document.getElementById('item-edit-form') as HTMLFormElement).reset();
    document.getElementById('edit-item')!.click();
  };

  const auditCreateMutation = trpc.audit.create.useMutation();

  const itemMutation = trpc.item.update.useMutation({
    onError: (e) => toast(e.data?.zodError?.message),
    onSuccess: async (change) => {
      await auditCreateMutation.mutateAsync({
        interaction: ItemInteraction.EDIT,
        itemId: change.id,
        change: { create: change }
      });
      await context.item.invalidate();
      await context.audit.invalidate();
      clearForm();
      toast('Item Updated');
    }
  });

  const methods = useZodForm({
    schema: ItemEditSchema,
    values: item
  });

  return (
    <>
      <input type="checkbox" id="edit-item" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="text-center text-lg font-bold">Edit Item</h3>
          <hr />
          <form
            id="item-edit-form"
            className="form-control"
            onSubmit={methods.handleSubmit(async (vals) => {
              await itemMutation.mutateAsync({ id: item.id, data: vals });
              methods.reset();
            })}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <label className="label">
                  <span className="label-text">Item Name</span>
                </label>
                <input
                  placeholder="Type here"
                  className="input-bordered input input-sm w-full"
                  {...methods.register('name')}
                />
                <span className="text-xs text-error">
                  {methods.formState.errors.name?.message}
                </span>
              </div>
              <div className="col-span-2">
                <label className="label">
                  <span className="label-text">Date Found</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Type here"
                  className="input-bordered input input-sm w-full"
                  {...methods.register('foundDate')}
                />
                <span className="text-xs text-error">
                  {methods.formState.errors.foundDate?.message}
                </span>
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
                <span className="text-xs text-error">
                  {methods.formState.errors.foundBuilding?.message}
                </span>
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
                <span className="text-xs text-error">
                  {methods.formState.errors.foundDescription?.message}
                </span>
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
                <span className="text-xs text-error">
                  {methods.formState.errors.shortDescription?.message}
                </span>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Categories</span>
                </label>
                <select
                  multiple
                  className="select-bordered select select-sm w-full"
                  {...methods.register('categories')}
                >
                  {Object.values(Category).map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <span className="text-xs text-error">
                  {methods.formState.errors.categories?.message}
                </span>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Value</span>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text-alt">Low</span>
                  <input
                    type="radio"
                    className="radio radio-sm"
                    value={Value.LOW}
                    {...methods.register('value')}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text-alt">Medium</span>
                  <input
                    type="radio"
                    className="radio radio-sm"
                    value={Value.MEDIUM}
                    {...methods.register('value')}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text-alt">High</span>
                  <input
                    type="radio"
                    className="radio radio-sm"
                    value={Value.HIGH}
                    {...methods.register('value')}
                  />
                </label>
                <span className="text-xs text-error">
                  {methods.formState.errors.value?.message}
                </span>
              </div>
              <div>
                <label className="label cursor-pointer">
                  <span className="label-text">Identifiable?</span>
                  <input type="checkbox" className="checkbox" />
                </label>
                {/* <span className="text-xs text-error">
                  {methods.formState.errors.identifiable?.message}
                </span> */}
              </div>
              <div className="col-span-2">
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
                <span className="text-xs text-error">
                  {methods.formState.errors.retrieveBuilding?.message}
                </span>
              </div>
              <div className="col-span-2">
                <label className="label">
                  <span className="label-text">Notes</span>
                </label>
                <textarea
                  className="textarea-bordered textarea h-24 w-full"
                  placeholder="Type here"
                  {...methods.register('longDescription')}
                />
                <span className="text-xs text-error">
                  {methods.formState.errors.longDescription?.message}
                </span>
              </div>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn-error btn-sm btn"
                onClick={clearForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={clsx(
                  'btn-success btn-sm btn',
                  itemMutation.isLoading && 'loading',
                  !methods.formState.isDirty && 'btn-disabled'
                )}
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ItemEditModal;
