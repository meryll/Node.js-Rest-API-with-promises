const moment = require('moment');

class Car {

	constructor(carBrand, licensePlate, parkingId, timeParkedAt) {
		this.brand = carBrand;
		this.licensePlate  = licensePlate;
		this.parkingId = parkingId;
		this.timeParkedAt = timeParkedAt;
	};

	print() {
		console.log(this.brand, this.licensePlate, this.parkingId);
	};
}

module.exports = Car;