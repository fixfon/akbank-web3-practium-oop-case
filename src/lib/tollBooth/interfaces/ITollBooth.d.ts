import { CarType } from '../../car/interfaces/ICar';

export type TollBoothName = 'TollBooth1' | 'TollBooth2' | 'TollBooth3';

//Pick<Car,'getHGSId' | 'getDriverFullName' | 'getBalance' | 'getCarType'>;
export interface TollBoothPassInfo {
	carInfo: {
		HGSId: number;
		driverFullName: string;
		balance: number;
		carType: CarType;
	};
	date: string;
	time: string;
	passPrice: number;
}

export interface ITollBooth {
	name: TollBoothName;
	passRecords: TollBoothPassInfo[]; // boothPass['boothNumber'][]:Array of boothPass with date - time - price for a particular booth
	passPrice: Record<CarType, number>;
	balance: number;

	getName(): TollBoothName;
	getPassPrice(carType: CarType): number;
	getBalance(): number;

	setBalance(_balance: number): void;

	getPassRecords(): TollBoothPassInfo[];
	getPassRecordsById(HGSId: number): TollBoothPassInfo[] | TollBoothPassInfo;
	getPassRecordsByCarType(
		carType: CarType
	): TollBoothPassInfo[] | TollBoothPassInfo;
	getPassRecordsByDate(date: string): TollBoothPassInfo[] | TollBoothPassInfo;
	addPassRecord(passRecord: TollBoothPassInfo): void;
	chargePass(carInstance: Auto | Minibus | Bus): void;
	calculateDailyBalance(): number;
}
