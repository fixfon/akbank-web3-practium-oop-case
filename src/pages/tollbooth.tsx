import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import Layout from '../components/layout';
import { useState } from 'react';
import { TollBoothName } from '../lib/tollBooth/interfaces/ITollBooth';

const TollBooths: NextPage = (props) => {
	const [selectedTollBooth, setSelectedTollBooth] =
		useState<TollBoothName>('TollBooth1');
	const [selectedCarValue, setSelectedCarValue] = useState<string>('none');

	const findTollBoothQuery = trpc.useQuery(
		[
			'booth.findTollBooth',
			{
				tollBoothName: selectedTollBooth,
			},
		],
		{
			refetchOnReconnect: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		}
	);
	const { data: findTollBoothQueryResult, refetch: findTollBoothRefetch } =
		findTollBoothQuery;

	const listTollBoothsQuery = trpc.useQuery(['booth.listTollBooths'], {
		refetchOnReconnect: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const { data: listTollBoothsQueryResult } = listTollBoothsQuery;

	const carListQuery = trpc.useQuery(['car.listCars'], {
		refetchOnReconnect: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const { data: carListQueryResult, refetch: carListRefetch } = carListQuery;

	const chargePassMutation = trpc.useMutation(['booth.chargePass'], {
		onSuccess: () => {
			findTollBoothRefetch();
			carListRefetch();
		},
	});
	const { mutate: mutateChargePass, data: chargePassResult, error: chargePassError } =
		chargePassMutation;

	const handleChargePass = () => {
		mutateChargePass({
			HGSId: Number(selectedCarValue),
			tollBoothName: selectedTollBooth,
		});
	};
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
							setSelectedTollBooth(e.target.value as TollBoothName);
						}}
						defaultValue={'none'}
						className='w-full p-2 border border-gray-400 rounded-lg'>
						<option value='none' disabled hidden>
							Select a toll booth
						</option>
						{listTollBoothsQueryResult &&
							listTollBoothsQueryResult.tollBoothNameList.map(
								(tollBoothName, index) => {
									return (
										<option key={index} value={tollBoothName}>
											{tollBoothName}
										</option>
									);
								}
							)}
					</select>
					<div>
						{findTollBoothQueryResult && (
							<>
								<div className='flex flex-row gap-3'>
									<p className='font-semibold pt-4 pb-2'>Toll Booth Name: </p>
									<p className='pt-4 pb-2'>
										{findTollBoothQueryResult.tollBoothInfo.tollBoothName}
									</p>
								</div>
								<div className='flex flex-row gap-3'>
									<p className='font-semibold pb-2'>Balance: </p>
									<p className='pb-2'>
										{findTollBoothQueryResult.tollBoothInfo.balance}
									</p>
								</div>
							</>
						)}
					</div>
					<p className='font-semibold pt-4 py-2'>Select A Car to Charge</p>
					<select
						onChange={(e) => {
							setSelectedCarValue(e.target.value);
						}}
						defaultValue={'none'}
						className='w-full p-2 border border-gray-400 rounded-lg'>
						<option value='none' disabled hidden>
							Select a car
						</option>
						{carListQueryResult &&
							carListQueryResult.carInfoList.map((carInfo, index) => {
								return (
									<option key={index} value={carInfo.HGSId}>
										{`${index + 1} - ${carInfo.HGSId} - ${carInfo.carType}`}
									</option>
								);
							})}
					</select>
					<button
						type='button'
						disabled={
							selectedCarValue === 'none' ||
							findTollBoothQuery.isFetching ||
							listTollBoothsQuery.isFetching ||
							chargePassMutation.isLoading
						}
						onClick={handleChargePass}
						className='rounded-lg font-semibold border border-red-600 bg-red-600 text-white mt-4 p-2 w-full disabled:bg-red-900 disabled:border-red-900 disabled:cursor-not-allowed'>
						Charge
					</button>
					{chargePassResult?.success &&
						(
							<p className='text-center pb-2 text-green-600 font-semibold'>
								{chargePassResult.success}
							</p>
						)}
					{chargePassError && (
						<p className='text-center pb-2 text-red-600 font-semibold'>
							{chargePassError.message}
						</p>
					)}
				</section>
			</main>
		</Layout>
	);
};

export default TollBooths;
