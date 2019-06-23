const fs = require('fs');
const FILE_NAME = `${__dirname}/../inventories/cars.json`

const Response = require('../core/response.js');

function getAll(req, res) {
	let cars = require(FILE_NAME);
	Response.Send(res, cars);
}

function create(req, res, route) {
	let data = route.body;
	if(!data) throw new Error(`Invalid data.`);
	if(!data.name) throw new Error(`Name required: ${data.name}.`);
	if(!data.year) throw new Error(`Year required: ${data.year}.`);
	if(isNaN(+data.year)) throw new Error(`Year must be an number: ${data.year}.`);
	if(!data.date) throw new Error(`Color required: ${data.date}.`);
	if(isNaN(+data.date)) throw new Error(`Date must be an date: ${data.date}.`);


	let cars = require(FILE_NAME);

	data.id = ++cars.counter;
	cars.data.push(data);

	fs.writeFile(FILE_NAME, JSON.stringify(cars), err => {
		if(err) return Response.ApplicationError(res, err);
		Response.Send(res, data);
	});
}

function getOne(req, res, route) {
	let id = +route.params.id;
	let cars = require(FILE_NAME);

	let car = cars.find(car => car.id === id);
	if (car) return Response.Send(res, car);

	Response.ApplicationError(res, new Error(`Cars ID: ${id} not found`))
}

function update(req, res, route) {
	let { id } = route.params;
	Response.Send(res, { id });
}

function report(req, res, route) {
	let cars = require(FILE_NAME);
	let data = cars
		.reduce((t, car, i) => {
			Object.keys(car).forEach(key => {
				t += `${key}:${car[key]}`;
				t += i < cars.length ? '\n' : '';
			});
			return t;
		}, '');

	Response.Send(res, data, {
		'contentType': 'text/csv'
	});
}

module.exports = {
	getAll,
	getOne,
	create,
	update,
	report,
};