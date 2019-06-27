const fs = require('fs');
const path = require('path');
const carsJson = require('../inventories/cars.json');

const {
  end,
  getData,
  throwErr
} = require('./method');

function GET(req, res) {
  end(res, {data:carsJson});
}

function POST(req, res) {
  getData({
      res,
      req
  }, parsed => {
      let prop = parsed.name ? parsed.name.toLowerCase() : null;
      let obj = {
          id: carsJson.length + 1,
          Name: prop,
          brandid:parsed.brandid ? parsed.brandid : null,
          Year: parsed.year ? parsed.year : null,
          Description: parsed.description ? parsed.description : null,
          Color: parsed.color ? parsed.color : null,
          Date: parsed.date ? parsed.date : null,
      };
      if (prop) {
          if (carsJson.map(o => o.name).indexOf(prop)) {
            carsJson.push(obj);
              fs.writeFile(path.resolve('./inventories/cars.json'), JSON.stringify(carsJson), throwErr);
              end(res, {data: carsJson});
          } else
              end(res, {error:'The car already exists'});
      } else {
          end(res, {error:`The property <<car>> returns ${prop} in the object ${JSON.stringify(parsed)}`});
      }
  });
}



module.exports = {
  GET,
  POST
};