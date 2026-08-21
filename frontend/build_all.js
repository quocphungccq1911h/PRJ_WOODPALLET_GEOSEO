const { buildIndex } = require('./build_home');
const { buildSanpham, buildChitiet } = require('./build_catalog');
const { buildBaogia, buildKhuvuc } = require('./build_quote_geo');
const { buildGioithieu, buildLienhe } = require('./build_info');

console.log('Building all HTML pages for Pallet Gỗ Việt B2B Platform...');
buildIndex();
buildSanpham();
buildChitiet();
buildBaogia();
buildKhuvuc();
buildGioithieu();
buildLienhe();
console.log('All 7 HTML pages successfully generated!');