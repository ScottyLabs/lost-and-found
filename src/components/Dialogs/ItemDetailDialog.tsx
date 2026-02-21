import { Item } from '@prisma/client';
import { FaTimes } from 'react-icons/fa';
import { Categories, Colors, Locations } from 'types';
import { Dialog } from './Dialog';

type ItemDetailDialogProps = {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
};

function formatDateFound(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit'
  });
}

export default function ItemDetailDialog({
  item,
  isOpen,
  onClose
}: ItemDetailDialogProps) {
  if (!item) return null;

  const rawCategories = Array.isArray(item.categories) ? item.categories : [];
  const categoryPills = rawCategories.length
    ? rawCategories.map((c, i) => ({
        key: `${String(c)}-${i}`,
        label: Categories[c as keyof typeof Categories] ?? String(c)
      }))
    : [{ key: 'none', label: '—' }];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      panelClassName="border border-accent pt-4 px-4 pb-6 text-black text-opacity-60 md:min-h-[26rem] md:rounded-xl"
    >
      <div className="flex flex-col gap-3 pb-6">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold">{item.name}</h2>
          <button
            type="button"
            className="btn-ghost btn-sm btn-circle btn shrink-0 hover:text-opacity-100"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        <p className="-mt-2 text-sm">
          Date Found: {formatDateFound(new Date(item.foundDate))}
        </p>
        <div className="mt-4 flex flex-wrap gap-1">
          {categoryPills.map(({ key, label }) => (
            <span
              key={key}
              className="rounded-full bg-accent px-3 py-1 text-sm text-accent-content"
            >
              {label}
            </span>
          ))}
        </div>
        <p className="text-base font-light">
          {item.shortDescription ?? 'No description'}
        </p>
        <div className="divider mt-4 border-black border-opacity-20" />
        <div className="flex flex-col gap-3.5">
          <div>
            <span className="font-bold">Found: </span>
            <span>{Locations[item.foundLocation]}</span>
          </div>
          <div>
            <span className="font-bold">Color: </span>
            <span>{Colors[item.color]}</span>
          </div>
          <div>
            <span className="font-bold">Retrieve From: </span>
            <span>{item.retrieveLocation}</span>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
