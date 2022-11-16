const { transactionsModel, userModel } = require('../../models');

const validateUserToCredited = async ({ userCredited }) => {
  const users = await userModel.getUsers();
  const userIsValid = users.some((user) => user.username === userCredited);
  if (!userIsValid) return { type: 'INVALID_VALUE', message: 'User not found' };
  return { type: null, message: '' };
};

const validateUserTodebited = async ({ userDebited }) => {
  const users = await userModel.getUsers();
  const userIsValid = users.some((user) => user.username === userDebited);
  if (!userIsValid) return { type: 'INVALID_VALUE', message: 'User not found' };
  return { type: null, message: '' };
}

const validateBalance = async ({ userDebited, value }) => {
  const { balance } = await transactionsModel.getBalance(userDebited);
  const transferCanBeDone = balance - (value * 100) >= 0;
  if(!transferCanBeDone) return { type: 'INVALID_VALUE', message: 'Insufficient funds' };
  return { type: null, message: ' '};
};

module.exports = {
  validateUserToCredited,
  validateBalance,
  validateUserTodebited,
}