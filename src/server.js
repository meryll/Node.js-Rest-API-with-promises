'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dp = require("./dataProvider/csvProvider");
const Car = require("./model/car.js");
const moment = require('moment');
const http = require('http');
const fs = require("fs");
const utils = require("./utils/datetimeUtils.js")
const core = require("./core.js")
const app = express()

const hostname = '127.0.0.1';
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }))

//todo add validation input params

app.get('/parkinglots/:id/cars/:T', function(req, res, next){
    let id = req.params.id;
    let T = req.params.T;

    core.getCars().then((cars)=> {
        return core.getByParkingLotId(cars,id, T);
    })
    .then((modifiedCars)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(modifiedCars);
    })
    .catch((error)=>{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        next(error);
    });
});

app.get('/inventory/:T', function(req, res, next) {

    let T = req.params.T;

    core.getCars().then((cars)=> {
        return core.getMoney(cars,T);
    })
    .then((money)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(money);
    })
    .catch((error)=> {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        next(error);
    });
});

const server = app.listen(port, hostname, function () {
   let host = server.address().address
   let port = server.address().port
   console.log("App listening at http://%s:%s", host, port)
})