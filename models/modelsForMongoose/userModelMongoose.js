const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const UserSchema = new Schema( {
//   username: String,
//   password: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   phone: String  
// } , {collection: 'stockholders'});

const StockSchema = new Schema({
  name: String,
  wkn: Number,
  price: Number
});

const UserSchema = new Schema( {
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String , 
  stocks: [StockSchema] 
});




const User = mongoose.model('user', UserSchema, 'stockholders');
module.exports = User;