const { userModel } = require('../models');
const {  validateUsername, validatePassword, validatelogin } = require('./validations/userValidations')

const login = async (user) => {
  const { type, message } = await validatelogin(user);
  if (type) return { type, message }
  const response = await userModel.login(user);
  return { type: null, message: response };
}

const signUp = async (user) => {
  const isValidUsername = await validateUsername(user);
  if (isValidUsername.type) return isValidUsername;
  const isValidPassword = await validatePassword(user);
  if(isValidPassword.type) return isValidPassword;
  const newUser = await userModel.signUp(user);
  return { type: null, message: newUser };
};

module.exports = {
  signUp,
  login,
};