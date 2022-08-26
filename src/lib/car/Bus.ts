import { Car } from './Car';
import { CarType } from './interfaces/ICar';

export class Bus extends Car {
	carType: CarType;

	constructor(HGSId: number, driverFullName: string, balance: number) {
		super(HGSId, driverFullName, balance);
		this.carType = 'Bus';
	}
}
