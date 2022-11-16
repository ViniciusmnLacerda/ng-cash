const { transactionsModel } = require('../models');

const getTransactions = async () => {
  const transactions = await transactionsModel.getTransactions();
  return { type: null, message: transactions };
};

module.exports = {
  getTransactions,
}