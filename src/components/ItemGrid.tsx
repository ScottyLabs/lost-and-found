import { FaCircleNotch } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import useItemFilterStore from 'stores/ItemFilterStore';
import { trpc } from 'utils/trpc';
import ItemCard from './ItemCard';

const ITEMS_PER_PAGE = 50;

type Props = {
  query: string;
};

export default function ItemGrid({ query }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstRender = useRef(true);
  const { categories, colors, date, locations } = useItemFilterStore();
  const itemsQuery = trpc.item.listPublic.useQuery({
    query,
    categories,
    colors,
    locations,
    date,
    page: currentPage,
    limit: ITEMS_PER_PAGE
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [query, categories, colors, locations, date]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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

  const { items, totalCount } = itemsQuery.data ?? { items: [], totalCount: 0 };
  if (!items.length) {
    return <p>Nothing to see here!</p>;
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            className="btn-ghost btn-sm btn"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="btn-ghost btn-sm btn"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
