const express = require('express');
const { transactionsController } = require('../controllers');
const { verifyJwt,verifyTransaction } = require('../middlewares/transactions.middleware');

const route = express.Router();

route.get('/', verifyJwt, transactionsController.getTransactions);

route.post('/', verifyJwt, verifyTransaction, transactionsController.transfer);

module.exports = route;