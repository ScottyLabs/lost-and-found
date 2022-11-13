import ItemGrid from 'components/ItemGrid';
import MainLayout from 'components/layout/MainLayout';
import { GetServerSideProps } from 'next';
import getServerAuthSession from 'server/common/get-server-auth-session';

function TablePage() {
	return (
		<MainLayout>
			<div className='mx-20'>
				<p>
					To retrieve an object, go to the location listed next to the object on
					the corresponding card. You will be required to identify any lost
					possessions. All items must be picked up in person and a photo ID is
					required.
				</p>
			</div>
			<div className='m-5 flex flex-col gap-1 rounded-md border border-amber-800 bg-amber-50 p-5 text-amber-900'>
				<div>
					<h1 className='text-lg font-semibold'>Lost an item?</h1>
					<p>
						If you lost an item, please check the items below first to see if
						your item is there. Otherwise, you can send an email to{' '}
						<a
							href='mailto:lost-and-found@cmu.edu'
							className='link-accent link'
						>
							lost-and-found@cmu.edu
						</a>
						. Note that we do not actively cross-reference reported lost items
						with current lost and found inventory. Instead, we use the
						information submitted in special cases should we need to identify an
						item.
					</p>
				</div>
				<div>
					<h1 className='text-lg font-semibold'>Found an item?</h1>
					<p>
						Please return it to the CUC Lost and Found. If you have any
						inquiries, please send an email to{' '}
						<a
							href='mailto:cucinfodesk@andrew.cmu.edu'
							className='link-accent link'
						>
							cucinfodesk@andrew.cmu.edu
						</a>{' '}
						or call 412-268-2107.
					</p>
				</div>
				<div>
					<h1 className='text-lg font-semibold'>Have feedback?</h1>
					<p>
						To leave feedback, please fill out this{' '}
						<a
							href='https://forms.gle/QDnNyjdzUBnFUkno8'
							target='_blank'
							rel='noreferrer'
							className='link-accent link'
						>
							form
						</a>
						. Thanks!
					</p>
				</div>
			</div>
			<ItemGrid />
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getServerAuthSession(ctx);
	if (!session)
		return { redirect: { destination: '/auth/signin', permanent: true } };
	return {
		props: {
			session
		}
	};
};

export default TablePage;
