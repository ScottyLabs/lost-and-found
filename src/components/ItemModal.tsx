import { FaCircleNotch, FaTimes } from 'react-icons/fa';
import { Categories, Locations } from 'types';
import { trpc } from 'utils/trpc';

type Props = {
  itemId: string;
  onClose: () => void;
};

export default function ItemModal({ itemId, onClose }: Props) {
  const itemQuery = trpc.item.byId.useQuery({ id: itemId });
  if (itemQuery.status === 'loading')
    return (
      <span className="my-10">
        <FaCircleNotch className="h-10 w-10 animate-spin transition-all" />
      </span>
    );

  if (itemQuery.isError)
    return (
      <span className="mockup-code w-full">
        <pre data-prefix="~">
          <code>{JSON.stringify(itemQuery.error, null, '\t')}</code>
        </pre>
      </span>
    );
  const item = itemQuery.data;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
        <div className="flex md:flex-col">
          <h2 className="flex-1 text-xl font-bold">{item.name}</h2>
          <span className="text-sm">
            <span className="font-bold">Date Found: </span>
            {item.foundDate.toDateString()}
          </span>
          <span className="text-sm">
            <span className="font-bold">Location Found: </span>
            {Locations[item.foundLocation]}
          </span>
        </div>
        {item.categories.length > 0 && (
          <div className="badge-accent badge badge-lg cursor-pointer">
            {item.categories.map((category) => Categories[category])}
          </div>
        )}
        <div className="divider divider-horizontal md:divider-vertical" />
        <div>
          <div>
            <span className="text-sm font-bold">Color: </span>
            <span>{item.color}</span>
          </div>
          <div>
            <span className="text-sm font-bold">Retrieve From: </span>
            <span>{item.retrieveLocation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
