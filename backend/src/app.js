const express = require('express');
const cors = require('cors');
const { userRoute, transactionsRoute } = require('./routes');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/ngcash', userRoute);

app.use('/transactions', transactionsRoute);

module.exports = app;