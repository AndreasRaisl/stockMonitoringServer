const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  name: String,
  wkn: Number,
  price: Number
});

module.exports = mongoose.model('stock', StockSchema, 'stocks');