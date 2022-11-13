import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { trpc } from 'utils/trpc';
import ItemCard from './ItemCard';

export default function ItemGrid() {
	const [query, setQuery] = useState('');
	const itemsQuery = trpc.item.getAll.useQuery();

	if (itemsQuery.status === 'loading')
		return (
			<span className='my-10'>
				<FaSpinner className='h-10 w-10 animate-spin transition-all' />
			</span>
		);

	if (itemsQuery.isError)
		return (
			<span className='mockup-code w-full'>
				<pre data-prefix='~'>
					<code>{JSON.stringify(itemsQuery.error, null, '\t')}</code>
				</pre>
			</span>
		);

	return (
		<>
			<input
				type='text'
				placeholder='Search...'
				className='input-bordered input w-full max-w-xs'
				onChange={(e) => setQuery(e.target.value)}
			/>
			<div className='mt-5 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{itemsQuery.data.length ? (
					itemsQuery.data
						.filter(
							(item) =>
								// item.status === Status.AVAILABLE &&
								item.approved &&
								item.published &&
								(item.name.toLowerCase().includes(query) ||
									item.shortDescription.toLowerCase().includes(query) ||
									item.foundDescription?.toLowerCase().includes(query))
						)
						.map((item) => <ItemCard key={item.id} item={item} />)
				) : (
					<p>Nothing to see here!</p>
				)}
			</div>
		</>
	);
}
