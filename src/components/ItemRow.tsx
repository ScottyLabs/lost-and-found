/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Item, ItemInteraction, Status, Value } from '@prisma/client';
import Image from 'next/image';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  FaArchive,
  FaBookOpen,
  FaCheck,
  FaEdit,
  FaImage,
  FaNewspaper
} from 'react-icons/fa';
import { trpc } from 'utils/trpc';
import useDialogStore from '../stores/DialogStore';

type ItemHistoryProps = {
  item: Item;
};

const ValueIcons: Record<Value, ReactNode> = {
  LOW: (
    <div className="rating tooltip rating-sm gap-1" data-tip="Low Value">
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-red-400"
      />
    </div>
  ),
  MEDIUM: (
    <div className="rating tooltip rating-sm gap-1" data-tip="Medium Value">
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-orange-400"
      />
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-orange-400"
      />
    </div>
  ),
  HIGH: (
    <div className="rating tooltip rating-sm gap-1" data-tip="High Value">
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-yellow-400"
      />
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-yellow-400"
      />
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-yellow-400"
      />
    </div>
  )
};

const StatusIcons: Record<Status, ReactNode> = {
  APPROVED: (
    <div className="tooltip" data-tip="Approved">
      <FaCheck size={20} />
    </div>
  ),
  ARCHIVED: (
    <div className="tooltip" data-tip="Archived">
      <FaArchive size={20} />
    </div>
  ),
  AVAILABLE: (
    <div className="tooltip" data-tip="Available">
      <FaBookOpen size={20} />
    </div>
  ),
  PUBLISHED: (
    <div className="tooltip" data-tip="Published">
      <FaNewspaper size={20} />
    </div>
  )
};

function ItemHistory({ item }: ItemHistoryProps) {
  const auditLogQuery = trpc.audit.list.useQuery({ itemId: item.id });

  if (auditLogQuery.isLoading) return <p>Loading...</p>;
  if (auditLogQuery.isError) return <p>Error...</p>;

  return (
    <div className="min-w-[128px] rounded">
      <div tabIndex={0} className="collapse-arrow collapse">
        <div className="collapse-title min-h-6 p-2 text-sm font-medium">
          Modified By
        </div>
        <div className="collapse-content whitespace-normal  text-xs">
          <p>
            {auditLogQuery.data.map((audit) => audit.actor.name).join('\n')}
          </p>
        </div>
      </div>
      <div tabIndex={0} className="collapse-arrow collapse">
        <div className="collapse-title min-h-6 p-2 text-sm font-medium">
          Approver
        </div>
        <div className="collapse-content whitespace-normal text-xs">
          {auditLogQuery.data.find(
            (audit) => audit.interaction === ItemInteraction.APPROVE
          )?.actorId ?? 'None'}
        </div>
      </div>
      <div tabIndex={0} className="collapse-arrow collapse">
        <div className="collapse-title min-h-6 p-2 text-sm font-medium">
          Returner
        </div>
        <div className="collapse-content text-xs">
          <p>Placeholder</p>
        </div>
      </div>
    </div>
  );
}

type ItemRowProps = {
  item: Item;
  selected: Item[];
  setSelected: Dispatch<SetStateAction<Item[]>>;
};

export default function ItemRow({ item, selected, setSelected }: ItemRowProps) {
  const { editItemDialog } = useDialogStore();

  return (
    <tr>
      <th>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={selected.some((i) => i.id === item.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelected(selected.concat(item));
              } else {
                setSelected(selected.filter((i) => i.id !== item.id));
              }
            }}
          />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          {item.imageURL ? (
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image src={item.imageURL} fill alt={item.name} />
              </div>
            </div>
          ) : (
            <FaImage />
          )}
          <div>
            <div className="min-w-[8rem] font-bold">{item.name}</div>
            <div className="text-sm opacity-50">{item.shortDescription}</div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <span className="font-bold">{item.foundBuilding}</span>
          <br />
          <span className="whitespace-pre-wrap text-sm font-thin">
            {item.foundDate.toDateString()}{' '}
            {item.foundDate.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric'
            })}
          </span>
        </div>
        <div className="opacity-50">{item.foundDescription}</div>
      </td>
      <td>{ValueIcons[item.value]}</td>
      <td>
        <div className="flex flex-col gap-2">
          {item.categories.map((category) => (
            <span
              key={category}
              className="badge-primary badge badge-sm text-xs font-bold"
            >
              {category}
            </span>
          ))}
        </div>
      </td>
      <td>{StatusIcons[item.status]}</td>
      <td>
        <button
          type="button"
          onClick={editItemDialog}
          className="btn-ghost btn"
        >
          <FaEdit size={20} />
        </button>
      </td>
      <td>
        <ItemHistory item={item} />
      </td>
    </tr>
  );
}
