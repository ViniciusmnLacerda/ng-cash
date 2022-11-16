const { transactionsService } = require('../services');
const mapError = require('../utils/mapError');

const getTransactions = async (req, res) => {
  const user = req.body
  const { message } = await transactionsService.getTransactions(user);
  res.status(200).json({ message })
};

const transfer = async (req, res) => {
  const request = req.body;
  const { type, message } = await transactionsService.transfer(request);
  if (type) return res.status(mapError(type)).json({ message })
  res.status(200).json({ message });
};

module.exports ={
  getTransactions,
  transfer,
}