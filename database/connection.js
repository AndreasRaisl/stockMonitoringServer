const mongoose = require('mongoose');

const URI = "mongodb+srv://Andreas:Wandervogel@cluster0-g20fj.mongodb.net/UsersAndStocks?retryWrites=true&w=majority";
 //const URI = "mongodb+srv://Andywolf:<Weltfahrer17>@cluster0-l6pit.mongodb.net/test?retryWrites=true&w=majority";

// const connect = () => {
//   // mongoose.connect('mongodb://localhost/stocks');
//   mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
//   mongoose.connection.once('open', () => {
//     console.log('Database connection established...');
//     })
//     .on('error', error => {
//     console.log('Connection error: ', error);
// }); 
// }

// module.exports= connect;




const connectDB = async() => {
  await  mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('Database is connected');

  const dbConnection = mongoose.connection;
  dbConnection.once('open', () => {
    console.log('OOOOOOOOPEN NOW!');
  });  

};

module.exports = connectDB;


