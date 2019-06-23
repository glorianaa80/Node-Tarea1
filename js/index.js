const http = require('http');

const Router = require('./core/router.js');
const cars = require('./controllers/cars.js');
// const brands = require('./controllers/brands.js');

const routesCars = [
	{
		method: 'GET',
		path: 'api/v1/cars',
		controller: cars.getAll,
	},
	{
		method: 'GET',
		path: '/api/v1/cars/report',
		controller: cars.report
	},
	{
		method: 'GET',
		path: 'api/v1/cars/:id',
		controller: cars.getOne,
	},
	{
		method: 'POST',
		path: '/api/v1/cars',
		controller: cars.create
	},
	{
		method: 'PUT',
		path: '/api/v1/cars/:id',
		controller: cars.updated
	},
];

// const routesBrands = [
// 	{
// 		methodBrands: 'GET',
// 		pathBrands: 'api/v1/brands',
// 		controllerBrands: brands.getAllBrands,
// 	},
// 	{
// 		methodBrands: 'GET',
// 		pathBrands: '/api/v1/brands/report',
// 		controllerBrands: brands.reportBrands,
// 	},
// 	{
// 		methodBrands: 'GET',
// 		pathBrands: 'api/v1/brands/:id',
// 		controllerBrands: brands.getOneBrands,
// 	},
// 	{
// 		methodBrands: 'POST',
// 		pathBrands: '/api/v1/brands',
// 		controllerBrands: brands.createBrands,
// 	},
// ];

const server = http.createServer(Router.Register(routesCars));
server.listen(5000);