const Joi = require('joi');

const createAccount = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().min(8).required(),
    picture: Joi.string().optional(),
    status: Joi.string().required(),
    unitId: Joi.number().required(),
    higherAccountId: Joi.any()
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
    type: Joi.string().required(),
    reason: Joi.string().required(),
    requesterId: Joi.number().required(),
    requestedId: Joi.number().required(),
    note: Joi.any().optional(),
    status: Joi.string().required()
  });

  return schema.validate(data);
};

const createMaterial = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    sku: Joi.string().required(),
    status: Joi.string().required(),
    detail: Joi.string().optional(),
    picture: Joi.string().optional(),
    categoryId: Joi.number().required()
  });

  return schema.validate(data);
};

const createMaterialCategory = async (data) => {
  const schema = Joi.object({
    category: Joi.string().required()
  });

  return schema.validate(data);
};

const createMaterialInventory = async (data) => {
  const schema = Joi.object({
    quantity: Joi.number().required(),
    materialId: Joi.number().required(),
    accountId: Joi.number().required()
  });

  return schema.validate(data);
};

const updateMaterialInventory = async (data) => {
  const schema = Joi.object({
    accountId: Joi.number().required(),
    reason: Joi.string().required(),
    note: Joi.any()
  });

  return schema.validate(data);
};

const createTool = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    sku: Joi.string().required(),
    status: Joi.string().required(),
    expired_at: Joi.date().required(),
    detail: Joi.string().optional(),
    picture: Joi.string().optional(),
    categoryId: Joi.number().required()
  });

  return schema.validate(data);
};

const createToolCategory = async (data) => {
  const schema = Joi.object({
    category: Joi.string().required()
  });

  return schema.validate(data);
};

const createToolInventory = async (data) => {
  const schema = Joi.object({
    quantity: Joi.number().required(),
    materialId: Joi.number().required(),
    accountId: Joi.number().required()
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
  createToolCategory,
  createMaterialInventory,
  createToolInventory,
  updateMaterialInventory
};
