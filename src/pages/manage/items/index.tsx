/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

import ItemRow from 'components/ItemRow';
import ManageLayout from 'components/Layouts/ManageLayout';
import Link from 'next/link';
import { NextPageWithLayout } from 'pages/_app';
import { useState } from 'react';
import { FaDownload, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useSelectedItemsStore from 'stores/SelectedItemStore';
import downloadItems from 'utils/downloadItems';
import { trpc } from 'utils/trpc';

const Manage: NextPageWithLayout = () => {
  const [query, setQuery] = useState('');
  const context = trpc.useContext();

  const items = trpc.item.list.useQuery();
  const itemDeleteMutation = trpc.item.delete.useMutation({
    onSuccess: (res) => {
      context.item.list.invalidate();
      setSelectedItems([]);
      toast.success(`Deleted ${res.count} Items`);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  const { selectedItems, setSelectedItems } = useSelectedItemsStore();

  if (items.isLoading) return <p>Loading...</p>;
  if (items.error) return <p>Error...</p>;

  return (
    <>
      <div className="flex items-center justify-center">
        <form className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="input-bordered input w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="tooltip" data-tip="Add Item">
            <Link href="/manage/items/create" className="btn-primary btn">
              <FaPlusCircle />
            </Link>
          </div>
          <div className="tooltip" data-tip="Delete Items">
            <button
              type="button"
              className="btn-error btn"
              disabled={selectedItems.length === 0}
              onClick={async () =>
                itemDeleteMutation.mutateAsync(selectedItems)
              }
            >
              <FaTrash />
            </button>
          </div>
          <div className="tooltip" data-tip="Download Items">
            <button
              type="button"
              onClick={() => downloadItems(items.data)}
              disabled={selectedItems.length === 0}
              className="btn-secondary btn"
            >
              <FaDownload />
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {items.data
          .filter((item) => item.name.includes(query))
          .map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
      </div>
    </>
  );
};

Manage.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default Manage;
