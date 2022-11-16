const { userSchema } = require('../utils/schemas');
const mapError = require('../utils/mapError');

const validateUser = (req, res, next) => {
  const { username, password} = req.body;
  const { error } = userSchema.validate({ username, password });
  if (error) {
    const { type } = error.details[0];
    const { message } = error.details[0];
    return res.status(mapError(type)).json({ message });
  } 
  next();
}

module.exports = {
  validateUser,
}