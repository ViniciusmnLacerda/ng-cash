const { transactionsService } = require('../services');

const getTransactions = async (req, res) => {
  const { message } = await transactionsService.getTransactions();
  res.status(200).json({ message })
};

module.exports ={
  getTransactions,
}