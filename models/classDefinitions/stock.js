const fs = require('fs');
const path = require('path');

const constructPath = require('../../utils/constructPath');
let parentDir = constructPath.getParentDir();
const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'stocks.json');

const fetchStocks = (callback) => {  
  fs.readFile(filePath, (err, data) => {
    if(err) return callback([]);
    callback(JSON.parse(data));
  });
};

module.exports = class Stock {

  constructor(name, wkn) {
    this.name = name;
    this.wkn = wkn;
  }

  addStock() {
    fetchStocks(stocks => {
      let lastElement = stocks[stocks.length - 1];
      let id = lastElement.id;
      id++; 
      this.id = id;
      this.price = 113;
      stocks.push(this);
      fs.writeFile(filePath, JSON.stringify(stocks), err => {
        console.log(err);
      });
    });      
  }    

  static getAllStocks(callback) {
    fetchStocks(callback);
  }
}