const path = require('path')
const Stock = require('../models/classDefinitions/stock');
const constructPath = require('./../utils/constructPath');
let parentDir = constructPath.getParentDir();

// let dataFromFile =  fs.readFileSync(path.join(parentDir, 'data', 'stocks.json'));
// const myStocks = JSON.parse(dataFromFile);

exports.getAllStocksView = (req, res) => {
  console.log("Got a request to the main page");
  Stock.getAllStocks((stocks) => {
    res.status(200).render('mainView', {stocks: stocks, stockListEmpty: stocks.length == 0});
  }); 
  // res.status(200).sendFile(path.join(__dirname, '../', 'views', 'mainView.html'));  
};

exports.getAllStocksData = (req, res, next) => {
  console.log('Got a request to /api/stocks');
  res.status(200).sendFile(path.join(parentDir, 'data', 'stocks.json'));
};

exports.getAddStockView = (req, res, next) => {
  console.log("Got a request to the add-stock page");
  res.status(200).sendFile(path.join(parentDir, 'views', 'addStock.html'));
};

exports.addStock = (req, res) => {
  console.log('Got a request to POST add-stock');    
  if(!req.body.name || !req.body.wkn) {
    res.redirect('/incompleteInput');
  }
  else {
    let stockToAdd = new Stock(req.body.name, req.body.wkn);      
    stockToAdd.addStock(); 
    res.redirect('/');     
  } 
};



