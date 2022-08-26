import { TollBooth } from '../../tollBooth/TollBooth';

interface IReport {
	activeBoothList: TollBooth[];

	getActiveBoothList(): TollBooth[];
	addActiveBooth(boothInstance: TollBooth): void;
	removeActiveBooth(boothName: string): void;

	getDailyRevenue(): number;
}
