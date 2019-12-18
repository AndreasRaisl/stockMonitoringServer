const fs = require('fs');
const path = require('path');

const constructPath = require('../../utils/constructPath');
let parentDir = constructPath.getParentDir();
const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'users.json');

const fetchUsers = (callback) => {  
  fs.readFile(filePath, (err, data) => {
    if(err) return callback([]);
    callback(JSON.parse(data));
  });
};

module.exports = class User {

  constructor(username, password,firstName, lastName,  email, phone) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  registerUser() {
    fetchUsers(users => {
      let lastElement = users[users.length - 1];
      let id = lastElement.id;
      id++; 
      this.id = id;
      
      users.push(this);
      fs.writeFile(filePath, JSON.stringify(users), err => {
        console.log(err);
      });
    });      
  }    

  static getAllUsers(callback) {
    fetchUsers(callback);
  }
}


