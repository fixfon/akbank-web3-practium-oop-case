import { createRouter } from './context';
import { z } from 'zod';
import { customAlphabet } from 'nanoid';
import { Auto } from '../../lib/car/Auto';
import { Minibus } from '../../lib/car/Minibus';
import { Bus } from '../../lib/car/Bus';

export const carRouter = createRouter()
	.query('findCar', {
		input: z.object({
			HGSId: z.number(),
		}),
		resolve({ input, ctx }) {
			const { HGSId } = input;

			if (!ctx.carInstanceList) return;

			const foundCar = ctx.carInstanceList.find(
				(car) => car.getHGSId() === HGSId
			);

			if (!foundCar) {
				throw new Error(`Car with HGSId ${HGSId} not found`);
			}
			const carInfo = {
				HGSId: foundCar.getHGSId(),
				carType: foundCar.getCarType(),
				driverFullName: foundCar.getDriverFullName(),
				balance: foundCar.getBalance(),
			};

			return { carInfo };
		},
	})
	.query('listCars', {
		resolve({ ctx }) {
			if (!ctx.carInstanceList) return;
			const carInfoList = ctx.carInstanceList.map((car) => {
				const carInfo = {
					HGSId: car.getHGSId(),
					carType: car.getCarType(),
					driverFullName: car.getDriverFullName(),
					balance: car.getBalance(),
				};

				return carInfo;
			});

			// console.log('Carinfolist', carInfoList);
			return {
				carInfoList,
			};
		},
	})
	.mutation('createCar', {
		input: z.object({
			driverFullName: z.string(),
			carType: z.enum(['Auto', 'Minibus', 'Bus']),
			balance: z.number(),
		}),
		async resolve({ input, ctx }) {
			let car;
			const customNanoId = customAlphabet('1234567890', 10); // Create random id for HGSId of the car
			const nanoId = customNanoId();

			switch (input.carType) {
				case 'Auto':
					car = new Auto(Number(nanoId), input.driverFullName, input.balance);
					break;
				case 'Minibus':
					car = new Minibus(
						Number(nanoId),
						input.driverFullName,
						input.balance
					);
					break;
				case 'Bus':
					car = new Bus(Number(nanoId), input.driverFullName, input.balance);
					break;
				default:
					break;
			}

			if (!car) {
				throw new Error('Error when creating the car');
			}
			ctx.carInstanceList.push(car);
			
			return {
				sucess: `A new car was created with HGS ID: ${nanoId}`,
			};
		},
	})
	.mutation('deleteCar', {
		// Deleteing a car from list
		input: z.object({
			HGSId: z.number(),
		}),
		async resolve({ input, ctx }) {
			const { HGSId } = input;

			const deleteIndex = ctx.carInstanceList.findIndex(
				(car) => car.getHGSId() === HGSId
			);

			if (deleteIndex === -1) {
				return {
					error: `Car with HGSId ${HGSId} not found`,
				};
			}
			ctx.carInstanceList.splice(deleteIndex, 1);

			return {
				sucess: `A car with HGS ID: ${HGSId} was deleted.`,
			};
		},
	});
