import { createRouter } from './context';
import { z } from 'zod';

export const carRouter = createRouter()
	.query('findCar', {
		input: z.object({
			HGSId: z.number(),
		}),
		resolve({ input }) {
			return {
				greeting: `Hello ${input ?? 'world'} ${input.HGSId}`,
			};
		},
	})
	.query('listCars', {
		resolve({}) {
			return {
				greeting: `Hello world`,
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
			return `${input}`;
		},
	})
	.mutation('deleteCar', {
		input: z.object({
			HGSId: z.number(),
		}),
		async resolve({ input, ctx }) {
			return `${input}`;
		},
	});
