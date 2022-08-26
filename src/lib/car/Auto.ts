import { Car } from './Car';
import { CarType } from './interfaces/ICar';

export class Auto extends Car {
	carType: CarType;

	constructor(HGSId: number, driverFullName: string, balance: number) {
		super(HGSId, driverFullName, balance);
		this.carType = 'Auto';
	}
}
