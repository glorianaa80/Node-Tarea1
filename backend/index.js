const http = require('http');

const register = require('./controllers/register.js');
const cars = require('./controllers/cars.js');
const brands = require('./controllers/brands.js');

const route = {
	cars : {
		path:  'api/v1/cars',
		controller: cars,
	},
	brands: {
		path:  'api/v1/brands',
		controller: brands,
	}
}


const server = http.createServer(register(route));
server.listen(5000);