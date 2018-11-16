'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dp = require("./dataProvider/csvProvider");
const Car = require("./model/car.js");
const moment = require('moment');
const http = require('http');
const fs = require("fs");
const utils = require("./utils/datetimeUtils.js")

module.exports.getCars = function() {
    let filePath = "../data/cars.csv";
    return dp.get(filePath)
};

module.exports.getMoney= function(parkingLots, hours) {

    return new Promise(function(resolve, reject) {
        try {
            let currentDate = utils.getDateInTheFuture(hours);
            
            let totalValue = 0;
            let totalDiscount = 0;
            let carsNumber = 0;

            for (var key in parkingLots) {

                let values = parkingLots[key].getAllMoney(currentDate);

                totalValue+=values[0];
                totalDiscount+=values[1];
                carsNumber+=parkingLots[key].getCarsLength();
            }

            let response = {
                totalAmountOfCars: carsNumber,
                value: totalValue / 100,
                discountInCents: totalDiscount
            };
            resolve(response);
        }
        catch(error) {
            reject(error);
        }
    });
};

module.exports.getByParkingLotId = function(parkingLots, parkingLotid, hours) {
    return new Promise(function(resolve, reject) { 
        try {
            let currentDate = utils.getDateInTheFuture(hours);
            let carsForParkingLot = parkingLots[parkingLotid].getCarsWithMoney(currentDate);
            resolve(carsForParkingLot);
        }
        catch(error) {
            reject(error);
        }
    });
};