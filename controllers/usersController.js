const User = require('../models/classDefinitions/user');
const UserModelForDatabase = require('../models/modelsForMongoose/userModelMongoose');

exports.registerUser = (req, res) => {
  console.log('Got a request to register a user');
  console.log(req.body);
  if(!req.body.username || !req.body.password) {
    res.redirect('/incompleteInput');
  }
  else {
    const {username, password, firstName, lastName, email, phone} = req.body;
    // let userToRegister = new User(username, password, firstName, lastName, email, phone);     
    // userToRegister.registerUser(); 
    // save user to database
    let userToAddDatabase = new UserModelForDatabase();
    userToAddDatabase.username = username;
    userToAddDatabase.password = password;
    userToAddDatabase.firstName = firstName;
    userToAddDatabase.lastName = lastName;
    userToAddDatabase.email = email;
    userToAddDatabase.phone = phone;
    // const userDataForDatabase = new UserModelForDatabase(userToRegister);
    userToAddDatabase.save((err, savedUser) => {
      if(err) console.log('Error saving the user to database');
      else {
        console.log('Saved user to DB successfully');
        res.status(200).json(savedUser);
      }
    });    
  }   
}


exports.authenticateUser = (req, res) => {
  console.log("Got a request to authenticate a user");
  const { username, password } = req.body;
  //console.log(checkUserData(req.body.username, req.body.password));
  checkUserData(req.body.username, req.body.password).then((result) => {
    res.send('Login successful. User logged in: ' + result);    
  }).catch((error) => {
    res.send('Login failed. ' + error);
  });  

function checkUserData(username, password) {
  return new Promise((resolve, reject) => {
  // UserModelForDatabase.find({})
  //   .exec((err, users) => {
  //     if(err) console.log('Error retrieving userlist from database: ' + err);
  //     else console.log('List of users from DB: ' + users);
  //   });
 
  UserModelForDatabase.findOne({username: username}).then((result) => {
    if(result) {
      if(result.password == password) {
        console.log('User is legal: ' + result);
        resolve(username);
      }
      else {
        console.log('Illegal user'); 
        reject('wrong password'); 
      }
    } else reject('username not found in DB');
  }); 
  });
}
  

  

  //let dataFromFile =  fs.readFileSync(path.join(parentDir, 'data', 'users.json'));
  //const allUsers = JSON.parse(dataFromFile);
  // let presentUser = allUsers.find(x => x.username === username && x.password === password);
  // if(presentUser) return true;
  // else return false;
  // allUsers.forEach(user => {
  //   if (user.username == username && user.password == password)
  //     return true;
  // });
  //return false;
}  