import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
	const router = useRouter();
	const currentRoute = router.pathname;
	return (
		<header className='flex items-center justify-around px-4 py-2 pt-24 text-gray-800'>
			<div className='flex items-center'>
				<Link href='/'>
					<a className={'flex items-center'}>
						<span className='font-bold text-2xl'>HGS Payment</span>
					</a>
				</Link>
			</div>
			<div className={'flex items-center gap-5'}>
				<Link href='/'>
					<a
						className={`${
							currentRoute === '/' && 'bg-red-600 text-white'
						} px-4 py-2 font-semibold rounded-lg`}>
						Cars
					</a>
				</Link>
				<Link href='/tollbooth'>
					<a
						className={`${
							currentRoute === '/tollbooth' && 'bg-red-600 text-white'
						} px-4 py-2 font-semibold rounded-lg`}>
						Toll Booths
					</a>
				</Link>
				<Link href='/report'>
					<a
						className={`${
							currentRoute === '/report' && 'bg-red-600 text-white'
						} px-4 py-2 font-semibold rounded-lg`}>
						Report
					</a>
				</Link>
			</div>
		</header>
	);
};

export default Header;
