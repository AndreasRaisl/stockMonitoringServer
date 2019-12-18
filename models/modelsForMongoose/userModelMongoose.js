const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema( {
  username: String,
  firstName: String,
  lastName: String,
  age: Number,
  password: String
});

module.exports = mongoose.model('stock', StockSchema, 'stocks');