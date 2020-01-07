const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema( {
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String  
} , {collection: 'stockholders'});


const User = mongoose.model('user', UserSchema, 'stockholders');
module.exports = User;