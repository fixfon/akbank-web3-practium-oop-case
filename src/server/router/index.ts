// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { carRouter } from './car';
import { boothRouter } from './tollBooth';
import { reportRouter } from './report';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('car.', carRouter)
	.merge('booth.', boothRouter)
	.merge('report.', reportRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
