const { userService } = require('../services');
const mapError = require('../utils/mapError');

const getUsers = async (req, res) => {
  const user = req.body;
  const { message } = await userService.getUsers(user);
  res.status(200).json({ message });
};

const signUp = async (req, res) => {
  const user = req.body;
  const { type, message } = await userService.signUp(user);
  if(type) return res.status(mapError(type)).json({ message });
  res.status(201).json(message);
}

module.exports = {
  getUsers,
  signUp,
};