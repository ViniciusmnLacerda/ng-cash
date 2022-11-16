const express = require('express');
const { userRoute, transactionsRoute } = require('./routes');

const app = express();

app.use(express.json());

app.use('/ngcash', userRoute);

app.use('/transactions', transactionsRoute);

module.exports = app;