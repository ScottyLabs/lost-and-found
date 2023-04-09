/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Item, ItemInteraction, Status } from '@prisma/client';
import Link from 'next/link';
import { toast } from 'react-toastify';
import useSelectedItemsStore from 'stores/SelectedItemStore';
import { trpc } from 'utils/trpc';
import { ValueIcons } from './ValueIcons';

type ItemRowProps = { item: Item };

export default function ItemRow({ item }: ItemRowProps) {
  const { selectedItems, setSelectedItems } = useSelectedItemsStore();

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
      toast('Item Updated');
    }
  });

  return (
    <div className="flex items-center gap-2 rounded border p-3">
      <div>
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={selectedItems.includes(item.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedItems([...selectedItems, item.id]);
            } else {
              setSelectedItems(selectedItems.filter((i) => i !== item.id));
            }
          }}
        />
      </div>
      <div className="flex-1">
        <div className="">
          <span className="text-xl font-bold">{item.name}</span>{' '}
          <span className="ml-2">{ValueIcons[item.value]}</span>
        </div>
        <span className="text-xs font-bold opacity-70">
          Located {item.foundBuilding} on {item.foundDate.toLocaleDateString()}
        </span>
      </div>
      <div>
        <div className="input-group-xs input-group">
          <select
            className="select-bordered select select-xs"
            value={item.status}
            onChange={(e) =>
              itemMutation.mutateAsync({
                id: item.id,
                data: {
                  ...item,
                  status: e.target.value as Status
                }
              })
            }
          >
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <Link
            className="btn-accent btn-xs btn"
            href={`/manage/edit/${item.id}`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
