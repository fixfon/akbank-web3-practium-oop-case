import { createRouter } from './context';
import { z } from 'zod';

export const boothRouter = createRouter()
	.query('findTollBooth', {
		input: z.object({
			tollBoothName: z.string(),
		}),
		resolve({ input }) {
			return {
				greeting: `Hello ${input ?? 'world'} ${input.tollBoothName}`,
			};
		},
	})
	.query('listTollBooths', {
		resolve({ ctx }) {
			return {
				greeting: `Hello world ${ctx.tollBoothInstanceList[0]?.balance}`,
			};
		},
	})
	.query('getDailyRevenue', {
		input: z.object({
			tollBoothName: z.string(),
		}),
		resolve({ input }) {
			return {
				greeting: `Hello ${input ?? 'world'} ${input.tollBoothName}`,
			};
		},
	})
	.mutation('deleteTollBooth', {
		input: z.object({
			HGSId: z.number(),
		}),
		async resolve({ input, ctx }) {
			return `${input}`;
		},
	})
	.mutation('chargePass', {
		input: z.object({
			HGSId: z.number(),
		}),
		resolve({ input, ctx }) {
			return `${input}`;
		},
	});
