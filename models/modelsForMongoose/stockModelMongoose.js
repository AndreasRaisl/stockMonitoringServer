const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema( {
  id: number,
  name: String,
  wkn: number,
  price: mumber
});

module.exports = mongoose.model('stock', StockSchema, 'stocks');