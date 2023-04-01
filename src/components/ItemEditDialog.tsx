/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Building, Category, ItemInteraction, Value } from '@prisma/client';
import useZodForm from 'hooks/useZodForm';
import { ItemEditSchema } from 'lib/schemas';
import { toast } from 'react-toastify';
import useDialogStore from 'stores/DialogStore';
import { trpc } from 'utils/trpc';
import { Dialog } from './Dialog';

type Props = {
  itemId: string;
};

function ItemEditDialog({ itemId }: Props) {
  const { dialog, clearDialog } = useDialogStore();

  const { data: item, status } = trpc.item.byId.useQuery({ id: itemId });

  const methods = useZodForm({
    schema: ItemEditSchema
  });

  const context = trpc.useContext();
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
      methods.reset();
      toast('Item Updated');
    }
  });

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  methods.reset(item);

  return (
    <Dialog isOpen={dialog === 'editItem'} onClose={clearDialog}>
      <h3 className="text-center text-lg font-bold">Add Item</h3>
      <hr />
      <form
        onSubmit={methods.handleSubmit(async (data) => {
          await itemMutation.mutateAsync({ id: itemId, data });
          methods.reset();
        })}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2">
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
              // {...methods.register('')}
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
            <div className="flex items-center gap-2">
              {Object.values(Category).map((category) => (
                <label key={category} className="label">
                  <input
                    type="checkbox"
                    className="peer"
                    {...methods.register('categories')}
                  />
                  <span className="badge badge-primary text-xs font-bold peer-checked:badge-primary">
                    {category}
                  </span>
                </label>
              ))}
              <label className="text-xs text-error">
                {methods.formState.errors.categories?.message}
              </label>
            </div>
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
                // {...methods.register('identifiable')}
              />
            </label>
            {/* <label className="text-xs text-error">
                  {methods.formState.errors.identifiable?.message}
                </label> */}
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
            <label className="text-xs text-error">
              {methods.formState.errors.retrieveBuilding?.message}
            </label>
          </div>
          <div className="col-span-2">
            <label className="label">
              <span className="label-text">Image Upload</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input-bordered file-input file-input-sm w-full"
            />
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
            <label className="text-xs text-error">
              {methods.formState.errors.longDescription?.message}
            </label>
          </div>
        </div>
        <div className="modal-action">
          <button
            type="button"
            className="btn-error btn-sm btn"
            onClick={() => {
              methods.reset();
              clearDialog();
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn-success btn-sm btn">
            Add
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default ItemEditDialog;
