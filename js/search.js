let brands = require('../inventories/brands.json')

function search(event) {
  if (!brands.length) return;

  let text = event.target.value;

  text = new RegExp(text, 'i');

  let data = brands.filter(item => text.test(item.name));


  renderTable(data);
}