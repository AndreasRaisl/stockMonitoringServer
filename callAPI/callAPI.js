const https = require('https');
const url = require('url');
const request = require('request');
// const alpha = require('alphavantage')({ key: 'NOKRBW4099UZDT6R' });



const APIKEY = 'NOKRBW4099UZDT6R';

const tickerSymbols = {
  'Allianz': 'ALV.DE',
  'Adidas': 'ADS.DE',
  'BASF': 'BASF.TI',
  'Bayer': 'BAYN.DE',
  'Beiersdorf': 'BEI.DE',
  'BMW': 'BMW.DE',
  'Continental': 'CON.DE',
  'Covestro': '1COV.DE',
  'Daimler': 'DAI.DE',
  'Deutsche Bank': 'DBK.DE',
  'Deutsche Börse': 'DB1.DE',
  'Deutsche Post': 'DPW.DE',
  'Deutsche Telekom': 'DTE.DE',  
  'Volkswagen': 'VOW3.FRK',  
  'E.ON': 'EOAN.DE',
  'Lufthansa': 'LHA.DE',
  'Wirecard': 'WDI.DE',
  'SAP': 'SAPA.DE'
}

module.exports.getPrice = (stock) => {
  
  return new Promise((resolve, reject) => {
    let stockSymbol = getStockSymbol(stock.name);
    //let urlInfo = buildUrlInfo(stockSymbol); 
    let stocksUrl =  `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${APIKEY}`;
    getStockPriceFromApi(stocksUrl, stock)
      .then((successValue) => {
        console.log('Promise resolves: Kurs ist :' + successValue);
        resolve(successValue);
      }).catch((error) => {
        console.log(error);
      });
  });
};

function getStockPriceFromApi(stocksUrl, stock) {
  // return new Promise((resolve, reject) => {
  //   https.get(stocksUrl, (res) => {
  //     let receivedString = '';
  //     res.on('data', (chunk) => {
  //       if(receivedString) {
  //         receivedString += chunk;
  //       }
  //       else {
  //         receivedString = chunk;
  //       }
  //     });
  //     res.on('end', () => {
  //       let price;
  //       let fullResult = JSON.parse(receivedString);
  //       if(fullResult) {
  //         price = fullResult['Global Quote']['05. price'];         
  //         resolve(price);                
  //       }
  //       else reject ('Error: Can t get the data from alphavantage API'); 
  //     });
  //   });
  // });  

  return new Promise((resolve, reject) => {
    request(stocksUrl, {json: true}, (err, res, body) => {  
      if(body) {
        let price = body['Global Quote']['05. price']; 
        resolve(price); 
      }
      else {
        reject('Error: Can t get the data from alphavantage API');
      }
    });
  });
}

function buildUrlInfo(tickerSymbol) {
  let parsedUrl = url.parse(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${tickerSymbol}&apikey=${APIKEY}`);
  let urlInfo = {};
  urlInfo.hostname = parsedUrl.host;
  urlInfo.path = parsedUrl.path;
  return urlInfo;
}

function getStockSymbol(stockname) {
  let stockSymbol = tickerSymbols[stockname];
  console.log('Found symbol: ' + stockSymbol);
  return stockSymbol;
}

function getDataFromApiWithAlphavantage(urlInfo, symbol, callback) {
  alpha.data.intraday(symbol).then(data => {
    callback(data);
  });  
}




// function getStockPriceFromApi(urlInfo, callback) {
//   http.request(urlInfo, (response) => {
//     let receivedString = '';
//     response.on('data', (chunk) => {
//       receivedString += chunk;
//     });
//     response.on('end', ()=> {
//       let result = JSON.parse(receivedString);
//       callback(null, result);
//     })
//   }).end();
// }



// alpha.data.batch([`msft`, `aapl`]).then(data => {
  //   console.log(data);
  // });

// function buildUrlInfo(stock) {
//   let urlInfo = {};
//   let symbol = getSymbol(stock);
//   urlInfo.path = `/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${APIKEY}`;
//   urlInfo.host = 'https://www.alphavantage.co';
//   urlInfo.port = 80;
//   urlInfo.method = 'GET';
//   return urlInfo;
// }

// getDataFromApi(urlInfo, (err, result) => {
//   console.log(result);
// });







// request.get('http://httpbin.org/ip');

//getPrice({name: 'Volkswagen'});