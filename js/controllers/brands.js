const fs2 = require('fs');
const FILE_NAME_BRANDS = `${__dirname}/../inventories/brands.json`

const Response2 = require('../core/response.js');

function getAllBrands(req, res) {
	console.log('hollla');
	let brands = require(FILE_NAME_BRANDS);
	Response2.Send(res, brands);
}

function createBrands(req, res, routeBrands) {
	let dataBrands = routeBrands.body;
	if(!dataBrands) throw new Error(`Invalid data.`);
	if(!dataBrands.name) throw new Error(`Name required: ${dataBrands.name}.`);

	let brands = require(FILE_NAME_BRANDS);

	dataBrands.id = ++brands.counter;
	brands.dataBrands.push(dataBrands);

	fs2.writeFile(FILE_NAME_BRANDS, JSON.stringify(brands), err => {
		if(err) return Response2.ApplicationError(res, err);
		Response2.Send(res, dataBrands);
	});
}

function getOneBrands(req, res, routeBrands) {
	let idBrands = +routeBrands.params.id;
	let brands = require(FILE_NAME_BRANDSv);

	let brand = brands.find(brand => brand.idBrands === idBrands);
	if (brand) return Response2.Send(res, brand);

	Response2.ApplicationError(res, new Error(`Brands ID: ${idBrands} not found`))
}

function updateBrands(req, res, routeBrands) {
	let { idBrands } = routeBrands.params;
	Response2.Send(res, { idBrands });
}

function reportBrands(req, res, routeBrands) {
	let brands = require(FILE_NAME_BRANDS);
	let dataBrands = brands
		.reduce((t, brand, i) => {
			Object.keys(brand).forEach(key => {
				t += `${key}:${brand[key]}`;
				t += i < brands.length ? '\n' : '';
			});
			return t;
		}, '');

	Response2.Send(res, dataBrands, {
		'contentType': 'text/csv'
	});
}

module.exports = {
	getAllBrands,
	getOneBrands,
	createBrands,
	updateBrands,
	reportBrands,
};