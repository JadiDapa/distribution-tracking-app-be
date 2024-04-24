const Joi = require('joi');

const createAccount = async (data) => {
  const schema = Joi.object({
    name: Joi.string().email().required(),
    user: Joi.string().required(),
    password: Joi.string().min(8).required(),
    address: Joi.string().required()
  });

  return schema.validate(data);
};

const loginAccount = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = { createAccount, loginAccount };
