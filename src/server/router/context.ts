// src/server/router/context.ts
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { Car } from '../../lib/car/Car';
import { Report } from '../../lib/report/Report';
import { TollBooth } from '../../lib/tollBooth/TollBooth';

type CreateContextOptions = Record<string, never>;

const carInstanceList: Car[] = [];
let tollBoothInstanceList: TollBooth[];
const reportInstance: Report = new Report();

export const createContextInner = async (opts: CreateContextOptions) => {
	// console.log('createContextInner run');
	if (tollBoothInstanceList === undefined) {
		const toll1 = new TollBooth('TollBooth1');
		const toll2 = new TollBooth('TollBooth2');
		const toll3 = new TollBooth('TollBooth3');
		tollBoothInstanceList = [toll1, toll2, toll3];
		reportInstance.addActiveBooth(toll1);
		reportInstance.addActiveBooth(toll2);
		reportInstance.addActiveBooth(toll3);
	}

	return {
		carInstanceList,
		tollBoothInstanceList,
		reportInstance,
	};
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
	opts: trpcNext.CreateNextContextOptions
) => {
	// console.log('createContext run');
	return await createContextInner({});
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
