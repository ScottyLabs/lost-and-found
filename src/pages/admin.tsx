/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Item } from '@prisma/client';
import ItemCreateModal from 'components/ItemCreateModal';
import ItemEditModal from 'components/ItemEditModal';
import ItemRow from 'components/ItemRow';
import MainLayout from 'components/layout/MainLayout';
import { unparse } from 'papaparse';
import { Fragment, useEffect, useState } from 'react';
import { FaDownload, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import useEditItemStore from 'stores/EditItemStore';
import { trpc } from 'utils/trpc';
import useModalStore from '../stores/ModalStore';

export default function AdminPage() {
  const { ref, inView } = useInView();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [query, setQuery] = useState('');
  const context = trpc.useContext();

  const itemsQuery = trpc.item.infiniteItems.useInfiniteQuery(
    { limit: 2 },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  );
  const itemDeleteMutation = trpc.item.delete.useMutation();

  useEffect(() => {
    if (inView) itemsQuery.fetchNextPage();
  }, [inView, itemsQuery]);

  const { createItemModal } = useModalStore();
  const { itemId } = useEditItemStore();

  if (itemsQuery.isLoading) return <p>Loading...</p>;
  if (itemsQuery.error) return <p>Error...</p>;

  return (
    <MainLayout>
      <ItemCreateModal />
      {itemId && <ItemEditModal itemId={itemId} />}

      <form className="my-5 flex flex-col">
        <div className="input-group mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="input-bordered input w-full max-w-xs"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={createItemModal}
            className="btn-primary btn-square btn"
          >
            <FaPlusCircle />
          </button>
          <button
            type="button"
            className="btn-error btn"
            disabled={selectedItems.length === 0}
            onClick={async () => {
              const res = await itemDeleteMutation.mutateAsync(
                selectedItems.map((selItem) => selItem.id)
              );
              setSelectedItems([]);
              toast(`Deleted ${res.count} Items`);
              context.item.infiniteItems.invalidate();
            }}
          >
            <FaTrash />
          </button>
          <button
            type="button"
            onClick={() => {
              const csv = unparse(itemsQuery.data.pages, { header: true });
              const file = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(file);
              const element = document.createElement('a');
              element.download = 'lostAndFoundData.csv';
              element.href = url;
              element.click();
            }}
            className="btn-secondary btn-square btn"
          >
            <FaDownload />
          </button>
        </div>
      </form>

      <div className="w-full overflow-x-auto">
        <table className="table-zebra table-compact m-auto table w-full table-fixed">
          <thead>
            <tr>
              <th className="w-10">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      selectedItems.length > 0 &&
                      itemsQuery.data.pages.reduce(
                        (accum, page) =>
                          accum.concat(
                            page.items.filter((item) =>
                              item.name.includes(query)
                            )
                          ),
                        [] as Item[]
                      ).length === selectedItems.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(
                          itemsQuery.data.pages.reduce(
                            (accum, page) =>
                              accum.concat(
                                page.items.filter((item) =>
                                  item.name.includes(query)
                                )
                              ),
                            [] as Item[]
                          )
                        );
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                </label>
              </th>
              <th>Information</th>
              <th>Found</th>
              <th className="w-16">Value</th>
              <th>Categories</th>
              <th className="w-16">Status</th>
              <th className="w-16">Edit</th>
              <th className="w-36">History</th>
            </tr>
          </thead>
          <tbody>
            {itemsQuery.data.pages.map((page) => (
              <Fragment key={page.nextCursor}>
                {page.items
                  .filter((item) => item.name.includes(query))
                  .map((item) => (
                    <ItemRow
                      key={item.id}
                      selected={selectedItems}
                      item={item}
                      setSelected={setSelectedItems}
                    />
                  ))}
              </Fragment>
            ))}
          </tbody>
        </table>
        <p ref={ref}>{itemsQuery.isFetchingNextPage && 'Loading more...'}</p>
      </div>
    </MainLayout>
  );
}
