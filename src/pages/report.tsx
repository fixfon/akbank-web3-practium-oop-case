import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import Layout from '../components/layout';

const Report: NextPage = (props) => {
	return (
		<Layout>
			<Head>
				<title>Report | HGS Payment</title>
				<meta name='description' content='See report of a toll booth.' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='text-gray-800 mx-auto flex items-center justify-center'>
				<section className='tollBoothSection w-60'>
					<h2 className='text-2xl pb-6 font-bold text-center'>
						Select a Toll Booth to See Reports
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
							Select
						</option>
					</select>
					
				</section>
			</main>
		</Layout>
	);
};

export default Report;
