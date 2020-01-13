const path = require('path')
//const Stock = require('../models/classDefinitions/stock');

const StockModelForDatabase = require('../models/modelsForMongoose/stockModelMongoose');
const UserModelForDatabase = require('../models/modelsForMongoose/userModelMongoose');
const stocksApi = require('../callAPI/callAPI');
const constructPath = require('./../utils/constructPath');
let parentDir = constructPath.getParentDir();

let currentUser = 'Franky';

// let dataFromFile =  fs.readFileSync(path.join(parentDir, 'data', 'stocks.json'));
// const myStocks = JSON.parse(dataFromFile);

exports.getAllStocksView = (req, res) => {
  console.log("Got a request to the main page showing a view of all stocks in the portfolio");
  // Stock.getAllStocks((stocks) => {
  //   //insertCurrentPrices(stocks);
  //   res.status(200).render('mainView', {stocks: stocks, stockListEmpty: stocks.length == 0});
  // });
  StockModelForDatabase.find()
    .then((stocks) => {

      res.status(200).render('mainView', {stocks: stocks, stockListEmpty: stocks.length == 0});
  });

  // res.status(200).sendFile(path.join(__dirname, '../', 'views', 'mainView.html'));  
};


exports.getAllStocksData = (req, res, next) => {
  console.log('Got a request to /api/stocks');
  //get stocks from the database
  StockModelForDatabase.find()
    .then((stocks) => {
      // stocks.forEach((stock) => {
      //   stocksApi.getPrice(stock, (newPrice) => {
      //     stock.price = newPrice;
      //   });
      // });
      res.status(200).json(stocks);
    });
  
  //     // fill up the prices by making API call
  //     // send the data as one array
  //   });
  
  // res.status(200).sendFile(path.join(parentDir, 'data', 'stocks.json'));
};

exports.getAddStockView = (req, res) => {
  console.log("Got a request to the add-stock page");
  res.status(200).sendFile(path.join(parentDir, 'views', 'addStock.html'));
};

exports.addStock = (req, res) => {
  console.log('Got a request to POST add-stock');   
  if(!req.body.selectedStock || !req.body.wkn) {
    console.log('Going into error');
    res.redirect('/incompleteInput');
  }
  else {
    // let stockToAdd = new Stock(req.body.name, req.body.wkn);      
    // stockToAdd.addStock(); 
    // add stock to database
    let stockToAddDatabase = new StockModelForDatabase();
    stockToAddDatabase.name = req.body.selectedStock;
    stockToAddDatabase.wkn = req.body.wkn;    
    
    stocksApi.getPrice(stockToAddDatabase).then((successValue) => {
      stockToAddDatabase.price = successValue;
      stockToAddDatabase.save((err, savedStock) => {
        if(err) console.log('Error saving the stock to database');
        else {
          console.log('Saved to DB successfully');
          res.status(200).json(savedStock);
        } 
      });
    }).catch((error) => {
      console.log(error);
    });    

    // UserModelForDatabase.findOne({username: currentUser}).then((result) => {
    //   result.stocks.push(stockToAddDatabase);
    //   result.save().then((result) => {
    //     console.log('Saved to DB successfully');
    //     res.status(200).json(result);
    //   }).catch((error) => {
    //     console.log('Error saving the new stock to the database: ' + error);
    //   });      
    // });
  }
}

exports.updatePrice = (req, res) => {
  console.log('Got a request to update the price of a stock');  
  let stock = req.body;
  stocksApi.getPrice(stock)
    .then((newPrice) => {
      updatePriceInDatabase(stock, newPrice) 
        .then((successValue)  => {          
          res.json(successValue.data);
        });
    });
};

exports.deleteStock = (req, res) => {
  console.log('Got a request to delete a stock');
  console.log(req.body);  
  let idToDelete = req.params.id; 
  // StockModelForDatabase.findByIdAndRemove(idToDelete, (err, deletedStock) => {
  //   if(err) {
  //     console.log(err);
  //     res.send('Error deleting record');
  //   } else {
  //     console.log("Successful deletion");
  //     res.json(deletedStock);
  //   }
  // }); 
  
  StockModelForDatabase.findByIdAndRemove(idToDelete).then((deletedStock) => {
    console.log("Successful deletion");
    res.json(deletedStock);
  }).catch((error) => {
    console.log(error);
    res.send('Error deleting record');
  });
  
  // StockModelForDatabase.findOneAndRemove({name: req.body.name}).then((response) => {

  // }
}


function updatePriceInDatabase(stock, newPrice) {
  console.log('The actual name is :' + stock.name);
  let nameToFind = stock.name;
  console.log('The actual _id is :' + stock._id);
  //let idToFind = stock._id;
  return new Promise((resolve, reject) => {
    //StockModelForDatabase.findOneAndUpdate({name: nameToFind},{$set:{price: newPrice}},{new:true})
    StockModelForDatabase.findOneAndUpdate({_id: stock._id},{price: newPrice},{new:true})
      .then((updatedDoc)=>{
      if(updatedDoc) {
        console.log('Successfully updated in database');
        resolve({success:true, data:updatedDoc});
      } else {
        console.log('Error updating database');
        reject({success:false,data:"Document to update not found in Database"});
      }
    });
  });  
}
      
      
    

    

    
    
   



