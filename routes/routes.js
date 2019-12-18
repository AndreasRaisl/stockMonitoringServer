const express = require('express');
const path = require('path');
const fs = require('fs');
const stocksController = require('../controllers/stocksController');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', stocksController.getAllStocksView);
router.get('/add-stock', stocksController.getAddStockView); 
router.post('/add-stock', stocksController.addStock);
router.get('/api/stocks', stocksController.getAllStocksData);
router.post('/users/authenticate', usersController.authenticateUser);
router.post('/users/register', usersController.registerUser);

module.exports = router;