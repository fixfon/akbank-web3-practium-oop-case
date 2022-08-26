import { TollBoothName } from '../tollBooth/interfaces/ITollBooth';
import { ICar, CarPassInfo, CarType } from './interfaces/ICar';

export abstract class Car implements ICar {
	abstract carType: CarType;
	HGSId: number;
	driverFullName: string;
	balance: number;
	boothPassRecords: CarPassInfo[]; // We will add records when we make a pass from the toll booth.

	constructor(HGSId: number, driverFullName: string, balance: number) {
		this.HGSId = HGSId;
		this.driverFullName = driverFullName;
		this.balance = balance;
		this.boothPassRecords = [];
	}

	getCarType(): CarType {
		return this.carType;
	}
	getHGSId(): number {
		return this.HGSId;
	}
	getDriverFullName(): string {
		return this.driverFullName;
	}
	getBalance(): number {
		return this.balance;
	}

	setBalance(_balance: number): void {
		this.balance = _balance;
	}

	getBoothPassRecords(boothName: TollBoothName): CarPassInfo[] {
		return this.boothPassRecords.filter(
			(record) => record.boothName === boothName
		);
	}
	getAllBoothPassRecords(): CarPassInfo[] {
		return this.boothPassRecords;
	}
	addBoothPassRecord(boothPass: CarPassInfo): void {
		this.boothPassRecords.push(boothPass);
	}
}
