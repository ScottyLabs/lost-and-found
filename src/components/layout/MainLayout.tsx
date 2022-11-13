import { PropsWithChildren } from 'react';
import MainHeader from './MainHeader';

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<div className='mx-auto w-full max-w-screen-xl flex-col p-8'>
			<MainHeader />
			<main className='flex w-full flex-col items-center'>{children}</main>
			{/* <MainFooter /> */}
		</div>
	);
}
