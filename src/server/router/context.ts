// src/server/router/context.ts
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { Car } from '../../lib/car/Car';
import { Report } from '../../lib/report/Report';
import { TollBooth } from '../../lib/tollBooth/TollBooth';
import { prisma } from '../db/client';

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = Record<string, never>;

let carInstanceList: Car[];
let tollBoothInstanceList: TollBooth[];
const reportInstance: Report = new Report();
/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
	if (tollBoothInstanceList === undefined) {
		const toll1 = new TollBooth('TollBooth1');
		const toll2 = new TollBooth('TollBooth2');
		const toll3 = new TollBooth('TollBooth3');
		tollBoothInstanceList = [toll1, toll2, toll3];
	}
	return {
		prisma,
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
	return await createContextInner({});
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
