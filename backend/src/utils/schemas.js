const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

const transferSchema = Joi.object({
  value: Joi.number().required().required(),
  userDebited: Joi.string().min(3).required(),
  userCredited: Joi.string().min(3).required(),
});

const getTransactionsSchema = Joi.object({
  username: Joi.string().min(3).required(),
});

module.exports = {
  userSchema,
  transferSchema,
  getTransactionsSchema,
};