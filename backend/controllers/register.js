const {
  okPath,
  end
} = require('./method');

const brands = require('../inventories/brands.json');
// const cars =  require('../inventories/cars.json');

function register(route) {
  return (req, res) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');

    if (okPath(req, route.brands.path)) {
      let a = route.brands.controller[req.method];

      if (!a) end(res, {
        error: `The method ${req.method} is not in brands`
      });
      else a(req, res);

    } else if (okPath(req, route.cars.path)) {
      let a = route.cars.controller[req.method];

      if (!a) end(res, {
        error: `The method ${req.method} is not in cars`
      });
      else a(req, res);

    } else end(res, {
      error: 'Resource not found',
      status: 404
    });
  }
}

module.exports = register;