import { createRouter } from './context';
import { z } from 'zod';

export const reportRouter = createRouter().query('getDailyRevenue', {
	resolve({ ctx }) {
		return {
			greeting: `Hello ${ctx.reportInstance}`,
		};
	},
});
