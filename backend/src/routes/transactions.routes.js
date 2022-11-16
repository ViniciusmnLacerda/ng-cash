const express = require('express');
const { transactionsController } = require('../controllers');
const { verifyJwt } = require('../middlewares/transactions.middleware');

const route = express.Router();

route.get('/', verifyJwt, transactionsController.getTransactions);

module.exports = route;