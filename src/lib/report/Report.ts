import { TollBooth } from '../tollBooth/TollBooth';
import { IReport } from './interfaces/IReport';

export class Report implements IReport {
	activeBoothList: TollBooth[];

	constructor() {
		this.activeBoothList = [];
	}

	getActiveBoothList(): TollBooth[] {
		return this.activeBoothList;
	}
	addActiveBooth(boothInstance: TollBooth): void {
		this.activeBoothList.push(boothInstance);
	}
	removeActiveBooth(boothName: string): void {
		this.activeBoothList = this.activeBoothList.filter(
			(booth) => booth.getName() !== boothName
		);
	}

	getDailyRevenue(): number {
		return this.activeBoothList.reduce(
			(acc, curr) => acc + curr.calculateDailyBalance(),
			0
		);
	}
}
