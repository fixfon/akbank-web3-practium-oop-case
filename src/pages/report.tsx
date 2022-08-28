import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import Layout from '../components/layout';

const Report: NextPage = (props) => {
	const currentDate = new Date().toISOString().split('T')[0];
	//const handleShowReport = (e) => {};
	return (
		<Layout>
			<Head>
				<title>Report | HGS Payment</title>
				<meta name='description' content='See report of a toll booth.' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='text-gray-800 mx-auto flex items-center justify-center'>
				<section className='tollBoothSection w-60'>
					<h2>Today's daily revenue</h2>
					<h2 className='text-2xl pb-6 font-bold text-center'>
						Select a Toll Booth to See Reports
					</h2>
					<form>
						<p className='font-semibold pb-2'>Select a Toll Booth</p>
						<select
							required
							onChange={(e) => {
								
								console.log(e.target.value);
							}}
							className='w-full p-2 border border-gray-400 rounded-lg'>
							<option value='' hidden>Select</option>
							<option value='1'>Select22</option>
							<option value='2'>Select1</option>
						</select>
						<p className='font-semibold py-2 pt-4'>Enter a date</p>
						<input
							required
							type='date'
							max={currentDate}
							defaultValue={currentDate}
							className='w-full p-2 border border-gray-400 rounded-lg'
						/>
						<button
							type='submit'
							className='rounded-lg font-semibold border border-red-600 bg-red-600 text-white mt-4 p-2 w-full'>
							View Report
						</button>
					</form>
				</section>
			</main>
		</Layout>
	);
};

export default Report;
