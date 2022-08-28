import type { NextPage } from 'next';
import Head from 'next/head';
import { CarType } from '../lib/car/interfaces/ICar';
import { trpc } from '../utils/trpc';
import Layout from '../components/layout';
import { FormEvent, useRef, useState } from 'react';

const Home: NextPage = (props) => {
	const [findCarParam, setFindCarParam] = useState<number>(0);
	const [selectedCarValue, setSelectedCarValue] = useState<string>('none');
	const fullNameRef = useRef<HTMLInputElement>(null);
	const carTypeRef = useRef<HTMLSelectElement>(null);
	const balanceRef = useRef<HTMLInputElement>(null);

	const createCarMutation = trpc.useMutation(['car.createCar'], {
		onSuccess: () => {
			carListRefetch();
		},
	});
	const { mutate: mutateCreateCar, data: createCarResult } = createCarMutation;

	const deleteCarMutation = trpc.useMutation(['car.deleteCar'], {
		onSuccess: () => {
			carListRefetch();
		},
	});
	const { mutate: mutateDeleteCar, data: deleteCarResult } = deleteCarMutation;

	const carListQuery = trpc.useQuery(['car.listCars'], {
		refetchOnReconnect: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const { data: carListQueryResult, refetch: carListRefetch } = carListQuery;

	const findCarQuery = trpc.useQuery(
		[
			'car.findCar',
			{
				HGSId: findCarParam,
			},
		],
		{
			refetchOnReconnect: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: findCarParam > 0,
		}
	);
	const { data: findCarQueryResult, refetch: findCarRefetch } = findCarQuery;

	const handleCreateCar = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const fullName = fullNameRef.current?.value;
		const carType = carTypeRef.current?.value;
		const balance = balanceRef.current?.value;
		if (fullName && carType && balance) {
			mutateCreateCar({
				driverFullName: fullName,
				carType: carType as CarType,
				balance: Number(balance),
			});
		}
	};

	const handleDeleteCar = () => {
		const HGSId = findCarParam;
		if (HGSId > 0) {
			mutateDeleteCar({ HGSId });
			if (
				!carListQueryResult?.carInfoList ||
				carListQueryResult?.carInfoList.length <= 0
			) {
				setFindCarParam(0);
				setSelectedCarValue('none');
				findCarRefetch();
			}
		}
	};

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
							ref={fullNameRef}
							type='text'
							className='w-full p-2 border border-gray-400 rounded-lg'
						/>
						<label className='font-semibold py-2 pt-4'>Select Car Type</label>
						<select
							required
							defaultValue={''}
							ref={carTypeRef}
							className='w-full p-2 border border-gray-400 rounded-lg'>
							<option value='' disabled>
								Select
							</option>
							<option value='Auto'>Auto</option>
							<option value='Minibus'>Minibus</option>
							<option value='Bus'>Bus</option>
						</select>
						<label className='py-2 pt-4 font-semibold'>Balance</label>
						<input
							required
							ref={balanceRef}
							type='number'
							min={1}
							max={1000}
							className='w-full p-2 border border-gray-400 rounded-lg'
						/>
						<button
							disabled={
								createCarMutation.isLoading ||
								deleteCarMutation.isLoading ||
								carListQuery.isFetching ||
								carListQuery.isRefetching
							}
							type='submit'
							className='rounded-lg font-semibold border border-red-600 bg-red-600 text-white mt-4 p-2 w-full disabled:bg-red-900 disabled:border-red-900'>
							Create A Car
						</button>
						<p className='font-medium text-green-600 pt-4'>
							{createCarResult && createCarResult.sucess}
						</p>
					</form>
				</section>
				<section className='listCarsSection'>
					<h1 className='text-2xl pb-4 font-bold text-center'>Car List</h1>
					<p className='font-semibold pb-2'>Select a car to see its details</p>
					<select
						value={selectedCarValue}
						onChange={(e) => {
							setSelectedCarValue(e.target.value);
							setFindCarParam(Number(e.target.value));
							findCarRefetch();
						}}
						className='w-full p-2 border border-gray-400 rounded-lg'>
						<option value='none' disabled hidden>
							Select
						</option>
						{carListQueryResult?.carInfoList &&
							carListQueryResult.carInfoList.map((carInfo, index) => {
								return (
									<option key={index} value={carInfo.HGSId}>{`${index + 1} - ${
										carInfo.HGSId
									}`}</option>
								);
							})}
					</select>
					<div>
						{findCarQueryResult?.carInfo && (
							<div>
								<p className='font-bold text-lg text-center pt-10 pb-2'>
									Car Details
								</p>
								<div>
									<div className='flex flex-row justify-between'>
										<p className='font-medium mr-4'>HGS ID:</p>
										<p>{findCarQueryResult.carInfo.HGSId}</p>
									</div>
									<div className='flex flex-row justify-between'>
										<p className='font-medium mr-4'>Driver Full Name:</p>
										<p>{findCarQueryResult.carInfo.driverFullName}</p>
									</div>
									<div className='flex flex-row justify-between'>
										<p className='font-medium mr-4'>Car Type:</p>
										<p>{findCarQueryResult.carInfo.carType}</p>
									</div>
									<div className='flex flex-row justify-between'>
										<p className='font-medium mr-4'>Balance:</p>
										<p>{findCarQueryResult.carInfo.balance}</p>
									</div>
									<div>
										<button
											type='button'
											disabled={
												createCarMutation.isLoading ||
												deleteCarMutation.isLoading ||
												carListQuery.isFetching ||
												carListQuery.isRefetching ||
												findCarQuery.isFetching ||
												findCarQuery.isRefetching
											}
											onClick={handleDeleteCar}
											className='rounded-lg font-semibold border border-red-600 bg-red-600 text-white mt-4 p-2 w-full disabled:bg-red-900 disabled:border-red-900 disabled:cursor-not-allowed'>
											Delete Car
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default Home;
