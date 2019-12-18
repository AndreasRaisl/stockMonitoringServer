const User = require('../models/classDefinitions/user');

exports.registerUser = (req, res) => {
  console.log('Got a request to register a user');
  console.log(req.body);
  // save user to database

  if(!req.body.username || !req.body.password) {
    res.redirect('/incompleteInput');
  }
  else {
    let userToRegister = new User(req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.email, req.body.phone);     
    userToRegister.registerUser(); 
    res.redirect('/');     
  } 


  res.status(200).send({'message': 'User registration successful'});
}


exports.authenticateUser = (req, res) => {
  console.log("Got a request to authenticate a user");
  const { username, password } = req.body;
  if(checkUserData(req.body.username, req.body.password)) res.send("Login successful");
  else res.send("Wrong Username or password");
};

function checkUserData(username, password) {
  let dataFromFile =  fs.readFileSync(path.join(parentDir, 'data', 'users.json'));
  const allUsers = JSON.parse(dataFromFile);
  let presentUser = allUsers.find(x => x.username === username && x.password === password);
  if(presentUser) return true;
  else return false;
  // allUsers.forEach(user => {
  //   if (user.username == username && user.password == password)
  //     return true;
  // });
  //return false;
}  