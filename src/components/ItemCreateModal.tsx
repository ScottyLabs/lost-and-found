/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Building, Category, Item, ItemInteraction } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaCircleNotch, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { trpc } from 'utils/trpc';

function ItemCreateModal() {
  const [newItem, setNewItem] = useState<Partial<Item>>({
    foundBuilding: Building.CUC,
    retrieveBuilding: Building.CUC,
    categories: []
  } as Partial<Item>);

  const context = trpc.useContext();
  const { data, status } = useSession({ required: true });

  const clearForm = () => {
    (document.getElementById('item-create-form') as HTMLFormElement).reset();
    document.getElementById('create-item')!.click();
  };

  const auditCreateMutation = trpc.audit.create.useMutation();

  if (status === 'loading') return <FaCircleNotch />;

  const itemMutation = trpc.item.create.useMutation({
    onError: (e) => toast(e.data?.zodError?.message ?? e.toString()),
    onSuccess: async (change) => {
      await auditCreateMutation.mutateAsync({
        interaction: ItemInteraction.CREATE,
        actorId: data.user?.id,
        itemId: change.id,
        change: { create: change }
      });
      await context.item.invalidate();
      clearForm();
      toast('Item Created');
    }
  });

  return (
    <>
      <input type="checkbox" id="create-item" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="text-center text-lg font-bold">Add Item</h3>
          <hr />
          <form
            id="item-create-form"
            className="form-control"
            onSubmit={(e) => {
              e.preventDefault();
              itemMutation.mutate(newItem as Item);
            }}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <label className="label">
                  <span className="label-text">Item Name</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Type here"
                  className="input-bordered input input-sm w-full"
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="label">
                  <span className="label-text">Date Found</span>
                </label>
                <input
                  required
                  type="datetime-local"
                  placeholder="Type here"
                  className="input-bordered input input-sm w-full"
                  onChange={(e) => {
                    setNewItem({
                      ...newItem,
                      foundDate: new Date(e.target.value)
                    });
                  }}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Building Found</span>
                </label>
                <select
                  className="select-bordered select select-sm w-full"
                  required
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      foundBuilding: e.target.value as Building
                    })
                  }
                >
                  {Object.values(Building).map((building) => (
                    <option key={building}>{building}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Location Found</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Type here"
                  className="input-bordered input input-sm w-full"
                  onChange={(e) =>
                    setNewItem({ ...newItem, foundDescription: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Short Description</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Type here"
                  className="input-bordered input input-sm w-full"
                  onChange={(e) =>
                    setNewItem({ ...newItem, shortDescription: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Categories</span>
                </label>
                <div className="flex items-center gap-2">
                  {newItem.categories?.map((category) => (
                    <button
                      type="button"
                      className="badge-primary badge text-xs font-bold"
                      onClick={() =>
                        setNewItem({
                          ...newItem,
                          categories: newItem.categories?.filter(
                            (c) => c !== category
                          )
                        })
                      }
                    >
                      {category}
                    </button>
                  ))}
                  <div className="dropdown-hover dropdown-bottom dropdown-end dropdown">
                    <label tabIndex={0} className="btn-xs btn-circle btn m-1">
                      <FaPlus />
                    </label>
                    <div
                      tabIndex={0}
                      className="dropdown-content menu rounded-box w-52 bg-base-200 p-2 shadow"
                    >
                      {Object.values(Category)
                        .filter((c) =>
                          newItem.categories?.every((ct) => ct !== c)
                        )
                        .map((category) => (
                          <li>
                            <button
                              type="button"
                              className="p-1 text-sm font-bold"
                              onClick={() =>
                                setNewItem({
                                  ...newItem,
                                  categories:
                                    newItem.categories?.concat(category)
                                })
                              }
                            >
                              {category}
                            </button>
                          </li>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Value</span>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text-alt">Low</span>
                  <input
                    type="radio"
                    name="value"
                    required
                    className="radio radio-sm"
                    onChange={() => setNewItem({ ...newItem, value: 'LOW' })}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text-alt">Medium</span>
                  <input
                    type="radio"
                    name="value"
                    className="radio radio-sm"
                    onChange={() => setNewItem({ ...newItem, value: 'MEDIUM' })}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text-alt">High</span>
                  <input
                    type="radio"
                    name="value"
                    className="radio radio-sm"
                    onChange={() => setNewItem({ ...newItem, value: 'HIGH' })}
                  />
                </label>
              </div>
              <div>
                <label className="label cursor-pointer">
                  <span className="label-text">Identifiable?</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="col-span-2">
                <label className="label">
                  <span className="label-text">Retrieve From</span>
                </label>
                <select
                  className="select-bordered select select-sm w-full"
                  required
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      retrieveBuilding: e.target.value as Building
                    })
                  }
                >
                  {Object.values(Building).map((building) => (
                    <option key={building}>{building}</option>
                  ))}
                </select>
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
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      longDescription: e.target.value
                    })
                  }
                />
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
              <button type="submit" className="btn-success btn-sm btn">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ItemCreateModal;
