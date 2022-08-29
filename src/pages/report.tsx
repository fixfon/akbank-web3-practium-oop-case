import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import Layout from '../components/layout';
import { useState } from 'react';
import { TollBoothName } from '../lib/tollBooth/interfaces/ITollBooth';

const Report: NextPage = (props) => {
	const currentDate = new Date().toISOString().split('T')[0];
	const [selectedTollBooth, setSelectedTollBooth] =
		useState<TollBoothName | null>(null);
	const [selectedDate, setSelectedDate] = useState<string>(currentDate as string);

	const getDailyRevenueQuery = trpc.useQuery(['report.getDailyRevenue'], {
		refetchOnReconnect: true,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const { data: getDailyRevenueQueryResult } = getDailyRevenueQuery;

	const getTollBoothNamesQuery = trpc.useQuery(['report.getTollBoothNames'], {
		refetchOnReconnect: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const { data: getTollBoothNamesQueryResult } = getTollBoothNamesQuery;

	const getRevenueByDateQuery = trpc.useQuery(
		[
			'report.getRevenueByDate',
			{
				tollBoothName: selectedTollBooth as TollBoothName,
				date: selectedDate,
			},
		],
		{
			refetchOnReconnect: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: selectedTollBooth !== null && selectedDate !== '',
		}
	);
	const { data: getRevenueByDateQueryResult } = getRevenueByDateQuery;

	return (
		<Layout>
			<Head>
				<title>Report | HGS Payment</title>
				<meta name='description' content='See report of a toll booth.' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='text-gray-800 mx-auto flex items-center justify-center'>
				<section className='tollBoothSection w-60'>
					<div className='flex flex-row gap-4 pb-4'>
						<h2 className='text-lg font-semibold'>{`Today's daily revenue for all toll booths`}</h2>
						{getDailyRevenueQueryResult && (
							<p className='text-lg font-semibold'>{`${getDailyRevenueQueryResult.dailyRevenue}`}</p>
						)}
					</div>
					<h2 className='text-2xl pb-6 font-bold text-center'>
						Select a Toll Booth to See Reports
					</h2>
					<p className='font-semibold pb-2'>Select a Toll Booth</p>
					<select
						onChange={(e) => {
							setSelectedTollBooth(e.target.value as TollBoothName);
						}}
						className='w-full p-2 border border-gray-400 rounded-lg'>
						<option value='' hidden>
							Select
						</option>
						{getTollBoothNamesQueryResult &&
							getTollBoothNamesQueryResult.tbNames.map((tbName, index) => (
								<option key={index} value={tbName}>
									{`${index + 1} - ${tbName}`}
								</option>
							))}
					</select>
					<p className='font-semibold py-2 pt-4'>Enter a date</p>
					<input
						onChange={(e) => setSelectedDate(e.target.value)}
						type='date'
						max={currentDate}
						defaultValue={currentDate}
						className='w-full p-2 border border-gray-400 rounded-lg'
					/>
					{getRevenueByDateQueryResult && (
						<div className='flex flex-row gap-4 pt-4'>
							<p className='font-semibold'>{`Revenue for ${selectedTollBooth} at ${selectedDate}: `}</p>
							<p className='font-semibold'>{`${getRevenueByDateQueryResult.revenue}`}</p>
						</div>
					)}
				</section>
			</main>
		</Layout>
	);
};

export default Report;
