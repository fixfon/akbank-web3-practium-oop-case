import { createRouter } from './context';
import { z } from 'zod';

export const reportRouter = createRouter().query('getDailyRevenue', {
	resolve({ ctx }) {
		const dailyRevenue = ctx.reportInstance.getDailyRevenue();
		return {
			dailyRevenue,
		};
	},
});
