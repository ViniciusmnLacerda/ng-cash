const { transferSchema, getTransactionsSchema } = require('../utils/schemas');
const mapError = require('../utils/mapError');
const jwt = require('jsonwebtoken');

const SECRET = 'ngcash';

const verifyJwt = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err, decoded) => {
    if(err) return res.status(401).json({ message: 'Unauthorized' });

    req.userId = decoded.userId;
    next();
  });
};

const verifyTransaction = async (req, res, next) => {
  const { value, userDebited, userCredited } = req.body;
  const { error } = transferSchema.validate({ value, userCredited, userDebited });
  if (error) {
    const { type } = error.details[0];
    console.log(type);
    const { message } = error.details[0];
    return res.status(mapError(type)).json({ message });
  }
  next();
}

module.exports = {
  verifyJwt,
  verifyTransaction,
};