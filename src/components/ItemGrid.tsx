import { Status } from '@prisma/client';
import { FaCircleNotch } from 'react-icons/fa';
import useItemFilterStore from 'stores/ItemFilterStore';
import { trpc } from 'utils/trpc';
import ItemCard from './ItemCard';

type Props = {
  query: string;
};

export default function ItemGrid({ query }: Props) {
  const itemsQuery = trpc.item.list.useQuery();
  const { categories, colors, date, locations } = useItemFilterStore();

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
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {itemsQuery.data
        .filter(
          (item) =>
            item.status === Status.APPROVED &&
            (item.name.toLowerCase().includes(query) ||
              item.shortDescription.toLowerCase().includes(query) ||
              item.foundDescription?.toLowerCase().includes(query)) &&
            (!categories.length ||
              item.categories.some((category) =>
                categories.includes(category)
              )) &&
            (!colors.length || colors.includes(item.color)) &&
            (!locations.length || locations.includes(item.retrieveBuilding)) &&
            (!date || item.foundDate.getTime() > date.getTime())
        )
        .map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
    </div>
  );
}
