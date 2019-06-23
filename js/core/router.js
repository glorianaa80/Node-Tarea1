const Response = require('./response.js');
const Route = require('./route.js')

let instance = null;
module.exports = class Router {
	constructor(routes) {
		this.routes = routes.map(r => new Route(r));
	}

	route(req, res) {
		let path = req.url;
		let method = req.method;

		let found = this.routes.find(r => r.check(path, method));
		if (!found) return Response.BadRequest(res, new Error(`Bad Request: ${method} ${path}`));

		let route = found.getInstance(path);
		console.log("route", route);
		route.execute(req, res);
	}

	static Register(routes) {
		if (!instance) instance = new Router(routes);
		return instance.route.bind(instance);
	}
}