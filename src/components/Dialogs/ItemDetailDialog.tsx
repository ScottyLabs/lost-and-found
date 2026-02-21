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
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold text-base-content">{item.name}</h2>
          <button
            type="button"
            className="btn-ghost btn-sm btn-circle btn shrink-0"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-base-content/70">
          Date Found: {formatDateFound(new Date(item.foundDate))}
        </p>
        <div className="flex flex-wrap gap-1">
          {categoryPills.map(({ key, label }) => (
            <span
              key={key}
              className="rounded-full bg-accent px-3 py-1 text-sm text-accent-content"
            >
              {label}
            </span>
          ))}
        </div>
        <p className="text-base text-base-content">
          {item.shortDescription ?? 'No description'}
        </p>
        <div className="divider my-0 border-base-content/20" />
        <div className="flex flex-col gap-1 text-sm text-base-content/60">
          <p>
            <span className="font-semibold text-base-content/80">Found: </span>
            {Locations[item.foundLocation]}
          </p>
          <p>
            <span className="font-semibold text-base-content/80">Color: </span>
            {Colors[item.color]}
          </p>
          <p>
            <span className="font-semibold text-base-content/80">
              Retrieve From:{' '}
            </span>
            {item.retrieveLocation}
          </p>
        </div>
      </div>
    </Dialog>
  );
}
