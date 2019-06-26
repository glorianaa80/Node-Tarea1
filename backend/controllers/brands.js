const fs = require('fs');
const path = require('path');
const brandsJson = require('../inventories/brands.json');

const {
  end,
  getData,
  throwErr
} = require('./method');

function GET(req, res) {
  end(res, {data:brandsJson});
}

function POST(req, res) {
  getData({
      res,
      req
  }, parsed => {
      let prop = parsed.brand ? parsed.brand.toLowerCase() : null;
      let obj = {
          id: brandsJson.length + 1,
          brand: prop,
          description: parsed.description ? parsed.description : null
      };
      if (prop) {
          if (brandsJson.map(o => o.brand).indexOf(prop) === -1) {
            brandsJson.push(obj);
              fs.writeFile(path.resolve('./inventories/brands.json'), JSON.stringify(brandsJson), throwErr);
              end(res, {data: brandsJson});
          } else
              end(res, {error:'The brand already exists'});
      } else {
          end(res, {error:`The property <<brand>> returns ${prop} in the object ${JSON.stringify(parsed)}`});
      }
  });
}



module.exports = {
  GET,
  POST
};