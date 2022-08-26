import type { TollBoothName } from '../../tollBooth/interfaces/ITollBooth';

export type CarType = 'Auto' | 'Minibus' | 'Bus';

export interface CarPassInfo {
	[index: string]: string | number;
	boothName: TollBoothName;
	date: string;
	time: string;
	passPrice: number;
}

export interface ICar {
	carType: CarType;
	HGSId: number;
	driverFullName: string;
	balance: number;
	boothPassRecords: CarPassInfo[]; // boothPassRecords['boothName'][]:Array of boothPass with date - time - price for a particular booth

	getCarType(): CarType;
	getHGSId(): number;
	getDriverFullName(): string;
	getBalance(): number;

	setBalance(_balance: number): void;

	getBoothPassRecords(boothName: TollBoothName): CarPassInfo[];
	getAllBoothPassRecords(): CarPassInfo[];
	addBoothPassRecord(boothPass: CarPassInfo): void;
}
