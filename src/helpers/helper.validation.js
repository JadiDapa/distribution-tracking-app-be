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

const createMaterial = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    sku: Joi.string().required(),
    status: Joi.string().required(),
    detail: Joi.string().required(),
    picture: Joi.string().required(),
    categoryId: Joi.number().required(),
    picture: Joi.string().required()
  });

  return schema.validate(data);
};

const createMaterialCategory = async (data) => {
  const schema = Joi.object({
    category: Joi.string().required()
  });

  return schema.validate(data);
};

const createTool = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    sku: Joi.string().required(),
    status: Joi.string().required(),
    detail: Joi.string().required(),
    picture: Joi.string().required(),
    categoryId: Joi.number().required(),
    picture: Joi.string().required()
  });

  return schema.validate(data);
};

const createToolCategory = async (data) => {
  const schema = Joi.object({
    category: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = {
  createAccount,
  loginAccount,
  createRequest,
  createMaterial,
  createMaterialCategory,
  createTool,
  createToolCategory
};
