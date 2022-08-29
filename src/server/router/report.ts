import { createRouter } from './context';
import { z } from 'zod';

export const reportRouter = createRouter()
	.query('getTollBoothNames', {
		resolve({ ctx }) {
			const tbNames = ctx.reportInstance
				.getActiveBoothList()
				.map((tb) => tb.getName());
			return {
				tbNames,
			};
		},
	})
	.query('getDailyRevenue', {
		resolve({ ctx }) {
			const dailyRevenue = ctx.reportInstance.getDailyRevenue();
			return {
				dailyRevenue,
			};
		},
	})
	.query('getRevenueByDate', {
		input: z.object({
			tollBoothName: z.enum(['TollBooth1', 'TollBooth2', 'TollBooth3']),
			date: z.string(),
		}),
		resolve({ input, ctx }) {
			const { tollBoothName, date } = input;
			const foundTollBooth = ctx.reportInstance
				.getActiveBoothList()
				.find((tb) => tb.getName() === tollBoothName);
			if (!foundTollBooth) {
				throw new Error(`TollBooth ${tollBoothName} not found`);
			}
			const passRecordsByDate = foundTollBooth.getPassRecordsByDate(date);

			if (!passRecordsByDate) {
				throw new Error(`No pass records found for ${date}`);
			} else if (passRecordsByDate instanceof Array) {
				const revenue = passRecordsByDate.reduce(
					(acc, passRecord) => acc + passRecord.passPrice,
					0
				);
				return {
					revenue,
				};
			}

			return {
				revenue: passRecordsByDate.passPrice,
			};
		},
	});
