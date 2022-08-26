import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import Layout from '../components/layout';
import { useState } from 'react';
import { TollBoothName } from '../lib/tollBooth/interfaces/ITollBooth';

const TollBooths: NextPage = (props) => {
	const [activeTollBooth, setActiveTollBooth] = useState<
		TollBoothName | undefined
	>(undefined);

	return (
		<Layout>
			<Head>
				<title>Toll Booths | HGS Payment</title>
				<meta name='description' content='See toll booths and charge cars.' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='text-gray-800 mx-auto flex items-center justify-center'>
				<section className='tollBoothSection w-60'>
					<h2 className='text-2xl pb-6 font-bold text-center'>
						Select a Toll Booth and Charge a Car
					</h2>
					<p className='font-semibold pb-2'>Select a Toll Booth</p>
					<select
						onChange={(e) => {
							setActiveTollBooth(e.target.value);
							console.log(e.target.value);
						}}
						defaultValue={'none'}
						className='w-full p-2 border border-gray-400 rounded-lg'>
						<option value='none' disabled hidden>
							Select a toll booth
						</option>
					</select>
					<p className='font-semibold pt-4 py-2'>Select Charged Car</p>
					<select
						defaultValue={'none'}
						className='w-full p-2 border border-gray-400 rounded-lg'>
						<option value='none' disabled hidden>
							Select a car
						</option>
					</select>
					<button
						type='button'
						className='rounded-lg font-semibold border border-red-600 bg-red-600 text-white mt-4 p-2 w-full'>
						Charge
					</button>
				</section>
			</main>
		</Layout>
	);
};

export default TollBooths;
