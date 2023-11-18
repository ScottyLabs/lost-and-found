/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Popover, Transition } from '@headlessui/react';
import { Color, Status, Value } from '@prisma/client';
import MyListbox from 'components/Form/Listbox';
import ItemRow from 'components/ItemRow';
import ManageLayout from 'components/Layouts/ManageLayout';
import useZodForm from 'hooks/useZodForm';
import { ItemSearchSchema } from 'lib/schemas';
import Link from 'next/link';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import {
  FaArchive,
  FaCheck,
  FaCircleNotch,
  FaDownload,
  FaPlusCircle,
  FaSortAmountDown,
  FaTrash
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import useDialogStore from 'stores/DialogStore';
import useSelectedItemsStore from 'stores/SelectedItemStore';
import { Colors } from 'types';
import { trpc } from 'utils/trpc';
import { z } from 'zod';

const ItemList: React.FC<{
  search: z.infer<typeof ItemSearchSchema>;
}> = ({ search }) => {
  const items = trpc.item.search.useQuery(search);
  if (items.isLoading) return <FaCircleNotch className="animate-spin p-4" />;
  if (items.error) return <p>Error...</p>;
  if (items.data.length === 0)
    return <p className="m-4 font-bold">No Items Found</p>;

  return (
    <div className="mt-4 flex flex-col gap-2">
      {items.data.map((item) => (
        <ItemRow key={item.id} item={item} />
      ))}
    </div>
  );
};

const Manage: NextPageWithLayout = () => {
  const context = trpc.useContext();
  const itemDownloadMutation = trpc.item.download.useMutation();
  const { selectedItems, setSelectedItems } = useSelectedItemsStore();
  const methods = useZodForm({
    schema: ItemSearchSchema,
    defaultValues: {
      query: '',
      status: null,
      color: null,
      value: null
    }
  });
  const items = trpc.item.search.useQuery(methods.getValues());
  const itemMassUpdateMutation = trpc.item.massUpdate.useMutation({
    onSuccess: (res) => {
      context.item.search.invalidate();
      toast.success(`Updated ${res.count} Items`);
    }
  });
  const { confirmItemDeletionDialog, massArchiveDialog } = useDialogStore();

  return (
    <>
      <div>
        <form
          className="w-full"
          onSubmit={methods.handleSubmit(console.log, console.error)}
        >
          <div className="flex gap-2">
            <input
              placeholder="Search..."
              className="input-bordered input w-full"
              {...methods.register('query')}
            />
            <Popover as="div" className="relative inline-block text-left">
              <Popover.Button className="btn-accent btn">
                <FaSortAmountDown />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel
                  unmount={false}
                  className="absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-md bg-base-100 shadow-2xl ring-1 ring-black ring-opacity-5"
                >
                  <div className="flex w-full items-center justify-between p-4">
                    <div className="font-bold">Status</div>
                    <div className="w-48">
                      <MyListbox
                        control={methods.control}
                        name="status"
                        placeholder="Select Status"
                        displayValue={(item) => item}
                        keyValue={(item) => item}
                        values={Object.values(Status)}
                      />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between p-4">
                    <div className="font-bold">Color</div>
                    <div className="w-48">
                      <MyListbox
                        control={methods.control}
                        name="color"
                        placeholder="Select Color"
                        displayValue={(item) => Colors[item]}
                        keyValue={(item) => item}
                        values={Object.values(Color)}
                      />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between p-4">
                    <div className="font-bold">Value</div>
                    <div className="w-48">
                      <MyListbox
                        control={methods.control}
                        name="value"
                        placeholder="Select Value"
                        displayValue={(item) => item}
                        keyValue={(item) => item}
                        values={Object.values(Value)}
                      />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-end gap-2 p-4">
                    <button
                      className="btn-ghost btn-sm btn"
                      type="button"
                      onClick={() => methods.reset()}
                    >
                      Reset
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </form>
        <div className="mt-2 flex flex-wrap justify-end gap-2">
          <div className="ml-3 flex flex-1 items-center">
            <input
              type="checkbox"
              className="checkbox"
              checked={
                selectedItems.length > 0 &&
                selectedItems.length === items.data?.length
              }
              onChange={(e) => {
                console.log(e.target.checked);
                if (!e.target.checked) setSelectedItems([]);
                else setSelectedItems(items.data?.map((item) => item.id) ?? []);
              }}
            />
          </div>
          <Link
            href="/manage/items/create"
            className="btn-primary btn-sm btn gap-1">
            <span>Add Item</span>
            <FaPlusCircle />
          </Link>
          <div className="basis-full sm:basis-0" />
          <div className="tooltip" data-tip="Approve Items">
            <button
              type="button"
              className="btn-ghost btn-sm btn"
              disabled={selectedItems.length === 0}
              onClick={async () =>
                itemMassUpdateMutation.mutate({
                  ids: selectedItems,
                  data: {
                    status: Status.APPROVED
                  }
                })
              }
            >
              <FaCheck />
            </button>
          </div>
          <div className="tooltip" data-tip="Archive Items">
            <button
              type="button"
              className="btn-ghost btn-sm btn"
              disabled={selectedItems.length === 0}
              onClick={async () =>
                itemMassUpdateMutation.mutate({
                  ids: selectedItems,
                  data: {
                    status: Status.ARCHIVED
                  }
                })
              }
            >
              <FaArchive />
            </button>
          </div>
          <div className="tooltip" data-tip="Download Items">
            <button
              type="button"
              onClick={async () => {
                const csv = await itemDownloadMutation.mutateAsync(
                  selectedItems
                );
                const file = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(file);
                const element = document.createElement('a');
                element.download = 'lostAndFoundData.csv';
                element.href = url;
                element.click();
              }}
              disabled={selectedItems.length === 0}
              className="btn-ghost btn-sm btn"
            >
              <FaDownload />
            </button>
          </div>
          <div className="tooltip" data-tip="Delete Items">
            <button
              type="button"
              className="btn-ghost btn-sm btn"
              disabled={selectedItems.length === 0}
              onClick={confirmItemDeletionDialog}
            >
              <FaTrash />
            </button>
          </div>
          <div className="tooltip" data-tip="Mass Archive">
            <button
              type="button"
              className="btn-ghost btn-sm btn"
              onClick={massArchiveDialog}
            >
              <FaArchive />
            </button>
          </div>
        </div>
      </div>
      <ItemList
        search={{
          query: methods.watch('query'),
          status: methods.watch('status'),
          color: methods.watch('color'),
          value: methods.watch('value')
        }}
      />
    </>
  );
};

Manage.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default Manage;
