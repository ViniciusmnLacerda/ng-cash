const { userModel } = require('../../models');
const bcrypt = require('bcrypt');

const validateUsername = async (user) => {
  const users = await userModel.getUsers();
  const canBeInserted = users.every((u) => u.username !== user.username);
  if(!canBeInserted) return { type: 'INVALID_VALUE', message: 'Username is already in use' }
  return { type: null, message: '' };
};

const validatePassword = async ({ password }) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if(!passwordRegex.test(password)) return { 
    type: 'INVALID_VALUE', message: 'Password is invalid'
  }
  return { type: null, message: '' };
}

const validatelogin = async ({ username, password }) => {
  const users = await userModel.getUsers();
  const user = users.find((u) => u.username === username);
  if (user === null) return { type: 'INVALID_VALUE', message: 'Username or password are invalid' }
  if (await bcrypt.compare(password, user.password)) return { type: null, message: '' };
  return { type: 'INVALID_VALUE', message: 'Username or password are invalid' }
}

const validatePasswordTologin = async ({ password }) => {
  const users = await userModel.getUsers();
}

module.exports = {
  validateUsername,
  validatePassword,
  validatelogin,
  validatePasswordTologin,
}