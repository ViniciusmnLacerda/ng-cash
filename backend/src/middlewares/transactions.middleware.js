const { userSchema } = require('../utils/schemas');
const mapError = require('../utils/mapError');
const jwt = require('jsonwebtoken');

const SECRET = 'ngcash';

const verifyJwt = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err, decoded) => {
    if(err) return res.status(401).end();

    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  verifyJwt,
}