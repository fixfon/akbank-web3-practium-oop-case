import { Auto } from '../car/Auto';
import { Bus } from '../car/Bus';
import { Minibus } from '../car/Minibus';
import { CarType } from '../car/interfaces/ICar';
import {
	ITollBooth,
	TollBoothName,
	TollBoothPassInfo,
} from './interfaces/ITollBooth';

export class TollBooth implements ITollBooth {
	name: TollBoothName;
	passRecords: TollBoothPassInfo[];
	passPrice: Record<CarType, number>;
	balance: number;

	constructor(name: TollBoothName) {
		this.name = name;
		this.passRecords = [];
		this.passPrice = {
			Auto: 15,
			Minibus: 20,
			Bus: 25,
		};
		this.balance = 0;
	}

	getName(): TollBoothName {
		return this.name;
	}
	getPassPrice(carType: CarType): number {
		return this.passPrice[carType];
	}
	getBalance(): number {
		return this.balance;
	}

	setBalance(_balance: number): void {
		this.balance = _balance;
	}

	getPassRecords(): TollBoothPassInfo[] {
		return this.passRecords;
	}
	// For the below three functions, we are returning an array of pass records if there are no records found we return empty array,
	getPassRecordsById(HGSId: number): TollBoothPassInfo | TollBoothPassInfo[] {
		return this.passRecords.filter((record) => record.carInfo.HGSId === HGSId);
	}
	getPassRecordsByCarType(
		carType: CarType
	): TollBoothPassInfo | TollBoothPassInfo[] {
		return this.passRecords.filter(
			(record) => record.carInfo.carType === carType
		);
	}
	getPassRecordsByDate(date: string): TollBoothPassInfo | TollBoothPassInfo[] {
		const dateObj = new Date(date);
		return this.passRecords.filter((record) => record.date === dateObj.toLocaleDateString());
	}
	addPassRecord(passRecord: TollBoothPassInfo): void {
		this.passRecords.push(passRecord);
	}
	// Accepting payments with below function
	chargePass(carInstance: Auto | Minibus | Bus) {
		const chargePrice = this.getPassPrice(carInstance.getCarType());

		if (chargePrice > carInstance.getBalance()) {
			throw new Error(
				`Not enough balance to charge for ${carInstance.getHGSId()}`
			);
		} else {
			const currentDateStr = new Date().toLocaleDateString();
			const currentTimeStr = new Date().toLocaleTimeString();

			this.setBalance(this.getBalance() + chargePrice);
			carInstance.setBalance(carInstance.getBalance() - chargePrice);

			this.addPassRecord({
				carInfo: {
					HGSId: carInstance.getHGSId(),
					driverFullName: carInstance.getDriverFullName(),
					balance: carInstance.getBalance(),
					carType: carInstance.getCarType(),
				},
				date: currentDateStr,
				time: currentTimeStr,
				passPrice: chargePrice,
			});

			carInstance.addBoothPassRecord({
				boothName: this.getName(),
				date: currentDateStr,
				time: currentTimeStr,
				passPrice: chargePrice,
			});
		}
	}
	calculateDailyBalance(): number {
		const currentDateStr = new Date().toLocaleDateString();
		const passRecords = this.getPassRecordsByDate(currentDateStr);
		let balance = 0;

		if (passRecords instanceof Array) {
			passRecords.forEach((record) => {
				balance += record.passPrice;
			});
		} else {
			balance += passRecords.passPrice;
		}

		return balance;
	}
}
