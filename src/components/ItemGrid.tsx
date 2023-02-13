import { Status } from '@prisma/client';
import { FaCircleNotch } from 'react-icons/fa';
import { trpc } from 'utils/trpc';
import ItemCard from './ItemCard';

type Props = {
  query: string;
};

export default function ItemGrid({ query }: Props) {
  const itemsQuery = trpc.item.getAll.useQuery();

  if (itemsQuery.status === 'loading')
    return (
      <span className="my-10">
        <FaCircleNotch className="h-10 w-10 animate-spin transition-all" />
      </span>
    );

  if (itemsQuery.isError)
    return (
      <span className="mockup-code w-full">
        <pre data-prefix="~">
          <code>{JSON.stringify(itemsQuery.error, null, '\t')}</code>
        </pre>
      </span>
    );

  if (!itemsQuery.data.length) {
    return <p>Nothing to see here!</p>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {itemsQuery.data
        .filter(
          (item) =>
            item.status === Status.AVAILABLE &&
            (item.name.toLowerCase().includes(query) ||
              item.shortDescription.toLowerCase().includes(query) ||
              item.foundDescription?.toLowerCase().includes(query))
        )
        .map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
    </div>
  );
}
