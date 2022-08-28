import { createRouter } from './context';
import { z } from 'zod';

export const boothRouter = createRouter()
	.query('findTollBooth', {
		input: z.object({
			tollBoothName: z.enum(['TollBooth1', 'TollBooth2', 'TollBooth3']),
		}),
		resolve({ input, ctx }) {
			const foundTollBooth = ctx.tollBoothInstanceList.find(
				(tb) => tb.getName() === input.tollBoothName
			);

			if (!foundTollBooth) {
				throw new Error(`TollBooth with name ${input.tollBoothName} not found`);
			}

			const tollBoothInfo = {
				tollBoothName: foundTollBooth.getName(),
				balance: foundTollBooth.getBalance(),
			};
			return {
				tollBoothInfo,
			};
		},
	})
	.query('listTollBooths', {
		resolve({ ctx }) {
			const tollBoothNameList = ctx.tollBoothInstanceList.map((tb) =>
				tb.getName()
			);
			return {
				tollBoothNameList: tollBoothNameList,
			};
		},
	})
	.mutation('chargePass', {
		input: z.object({
			HGSId: z.number(),
			tollBoothName: z.enum(['TollBooth1', 'TollBooth2', 'TollBooth3']),
		}),
		resolve({ input, ctx }) {
			const foundTollBooth = ctx.tollBoothInstanceList.find(
				(tb) => tb.getName() === input.tollBoothName
			);

			if (!foundTollBooth) {
				throw new Error(`TollBooth with name ${input.tollBoothName} not found`);
			}

			const foundCar = ctx.carInstanceList.find(
				(car) => car.HGSId === input.HGSId
			);
			if (!foundCar) {
				throw new Error(`Car with HGSId ${input.HGSId} not found`);
			}

			foundTollBooth.chargePass(foundCar);
			return {
				success: `Car: ${foundCar.HGSId} was charged successfully at ${
					foundTollBooth.name
				} toll booth with ${foundTollBooth.getPassPrice(
					foundCar.getCarType()
				)}`,
			};
		},
	});
