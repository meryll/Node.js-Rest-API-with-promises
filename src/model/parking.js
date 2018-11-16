const utils = require("../utils/datetimeUtils.js");
const moment = require("moment");
const deepcopy = require('deepcopy');

class Parking {

	constructor(id) {
		this.id = id;
		this.cars = [];
		this.hoursPriceCents = 120;
		this.discountAfter = 3;
		this.discountValueCents = 10;
	};

	addCar(newCar) {
		if (this.cars.length >=23) {
			console.error("Max number of cars is 23");
		} else {
			this.cars.push(newCar);
		}
	};

	getCarsLength() {
		return this.cars.length;
	};

	getAllMoney(forDate) {
		let totalDiscount = 0;
		let totalValue = 0;

		let carsWithMoney = this.getCarsWithMoney(forDate);

		for (var i = 0; i < carsWithMoney.length; i++) {
			let currentCar = carsWithMoney[i];
  
            totalValue+=currentCar.valueInCents;
            totalDiscount+=currentCar.discountInCents;
        }

        return [totalValue, totalDiscount];
	};


	getCarsWithMoney(forDate) {    
		let carsCopy = deepcopy(this.cars);

        for (var i = 0; i < carsCopy.length; i++){
            let currentCar = carsCopy[i];
            this.getValuesForCar(currentCar, forDate);
        }

        return carsCopy;
	}

	getValuesForCar(car, forTime) {
		let hoursDiff = utils.getHoursDiff(moment(car.timeParkedAt), forTime);
        let value = this.calculateValue(hoursDiff);
        let discount = this.calculateDiscount(hoursDiff);

        car.valueInCents = value;
        car.discountInCents = discount;
	}

	calculateValue(hours) {
    return hours*this.hoursPriceCents;
	};

	calculateDiscount(hours) {
	    if (hours>this.discountAfter) {
	        return (hours-this.discountAfter)*this.discountValueCents;
	    }
	    return 0;
	};
};

module.exports = Parking;