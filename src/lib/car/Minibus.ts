import { Car } from './Car';
import { CarType } from './interfaces/ICar';

export class Minibus extends Car {
	carType: CarType;

	constructor(HGSId: number, driverFullName: string, balance: number) {
		super(HGSId, driverFullName, balance);
		this.carType = 'Minibus';
	}
}
