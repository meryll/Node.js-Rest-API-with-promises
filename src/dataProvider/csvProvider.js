const fs = require('fs'); 
const csv = require('csv-parse');
const Car = require("../model/car.js");
const Parking = require("../model/parking.js");
const csvtojson=require("csvtojson");

let get = function(inputFilePath) {
	return new Promise(function(resolve, reject) { 
		try {
			csvtojson({
		  	delimiter: ';'
		  })
		  .fromFile(inputFilePath)
		  .then(function(jsonArrayObj){
		  	return parseToObject(jsonArrayObj);
		   })
		  .then(function(objects){
		  	resolve(objects);
		  })
		} catch (err) {
			reject(err);
		}
	});
};

function parseToObject(json){

	return new Promise(function(resolve, reject){
		const uniqueParkingLots = unique(json, 'parkinglotId');

		parkingLots = {};
		for(var i=0; i<uniqueParkingLots.length; i++) {
			parkingId = uniqueParkingLots[i];
			parkingLots[parkingId]=new Parking(parkingId);
		}

		for(var i=0; i<json.length; i++) {
			let carBrand = json[i].carBrand;
	    	let licensePlate = json[i].licensePlate;
	    	let parkingId = json[i].parkinglotId;
	    	let timeParkedAt = json[i].timeParkedAt;
			car = new Car(carBrand, licensePlate, parkingId, timeParkedAt);
			parkingLots[parkingId].addCar(car);
		}
		resolve(parkingLots);
	});
};

function unique(arr, prop) {
    return arr.map(function(e) { return e[prop]; }).filter(function(e,i,a){
        return i === a.indexOf(e);
    });
}

module.exports.get = get


		
		