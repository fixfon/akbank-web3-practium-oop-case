import type { NextPage } from 'next';
import Head from 'next/head';
import { ICar } from '../lib/car/interfaces/ICar';
import { trpc } from '../utils/trpc';
import Layout from '../components/layout';

const Home: NextPage = (props) => {
	const handleCreateCar = (e) => {};

	return (
		<Layout>
			<Head>
				<title>Create Car | HGS Payment</title>
				<meta
					name='description'
					content='Create new car instances and see all existing cars.'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='text-gray-800 mx-auto flex flex-row items-center justify-center gap-32'>
				<section className='createCarSection w-60'>
					<h2 className='text-2xl pb-4 font-bold text-center'>Create Car</h2>
					<form
						className='flex flex-col items-center justify-center'
						onSubmit={handleCreateCar}>
						<label className='py-2 font-semibold'>Driver Full Name</label>
						<input
							required
							type='text'
							className='w-full p-2 border border-gray-400 rounded-lg'
						/>
						<label className='font-semibold py-2 pt-4'>Select Car Type</label>
						<select
							required
							defaultValue={'none'}
							className='w-full p-2 border border-gray-400 rounded-lg'>
							<option value='none' disabled hidden>
								Select
							</option>
							<option value='auto'>Auto</option>
							<option value='minibus'>Minibus</option>
							<option value='bus'>Bus</option>
						</select>
						<label className='py-2 pt-4 font-semibold'>Balance</label>
						<input
							type='number'
							className='w-full p-2 border border-gray-400 rounded-lg'
						/>
						<button
							type='submit'
							className='rounded-lg font-semibold border border-red-600 bg-red-600 text-white mt-4 p-2 w-full'>
							Create A Car
						</button>
					</form>
				</section>
				<section className='listCarsSection'>
					<h1 className='text-2xl pb-4 font-bold text-center'>Car List</h1>
					<p className='font-semibold pb-2'>Select a car to see its details</p>
					<select
						defaultValue={'none'}
						className='w-full p-2 border border-gray-400 rounded-lg'>
						<option value='none' disabled hidden />
						{}
					</select>
				</section>
			</main>
		</Layout>
	);
};

// const CarInfo = ({
// 	HGSId,
// 	balance,
// 	carType,
// 	driverFullName,
// }: Pick<ICar, 'HGSId' | 'balance' | 'carType' | 'driverFullName'>) => {
// 	return (
// 		<section className='flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105'>
// 			<h2 className='text-lg text-gray-700'>{name}</h2>
// 			<p className='text-sm text-gray-600'>{description}</p>
// 			<a
// 				className='mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2'
// 				href={documentation}
// 				target='_blank'
// 				rel='noreferrer'>
// 				Documentation
// 			</a>
// 		</section>
// 	);
// };

export default Home;
