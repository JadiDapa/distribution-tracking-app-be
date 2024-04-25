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

const createRequest = async (data) => {
  const schema = Joi.object({
    requesterId: Joi.number().required(),
    requestedId: Joi.number().required(),
    note: Joi.string().required(),
    status: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = { createAccount, loginAccount, createRequest };
