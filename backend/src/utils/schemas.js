const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});


const transferSchema = Joi.object({
  value: Joi.number().required().required(),
  userDebited: Joi.string().min(3).required(),
  userCredited: Joi.string().min(3).custom((value, helper) => {
    if (value === helper.state.ancestors[0].userDebited) return helper.error("any.invalid")
    else return true
  }).required(),
});

const getTransactionsSchema = Joi.object({
  username: Joi.string().min(3).required(),
});

module.exports = {
  userSchema,
  transferSchema,
  getTransactionsSchema,
};