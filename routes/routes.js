const express = require('express');
const path = require('path');
const fs = require('fs');
const stocksController = require('../controllers/stocksController');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', stocksController.getAllStocksView);
router.get('/api/stocks', stocksController.getAllStocksData);

router.get('/add-stock', stocksController.getAddStockView); 
router.post('/api/add-stock', stocksController.addStock);

router.put('/api/update-price', stocksController.updatePrice);

router.delete('/api/delete-stock/:id', stocksController.deleteStock);

router.post('/users/authenticate', usersController.authenticateUser);
router.post('/users/register', usersController.registerUser);

router.get('/update-stock-price/:name', stocksController.updatePrice);
// router.put('/update-stock/:id', stocksController.updateStock);
router.delete('/delete-stock/:name', stocksController.deleteStock);
// router.get('/users/profile/id', usersController.getUserProfile);

// setInterval(20000, stocksController.updateAllPrices);

module.exports = router;