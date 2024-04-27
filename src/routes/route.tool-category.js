const express = require('express');
const ToolCategoryRouter = express.Router();
const ToolCategoryController = require('../controllers/controller.tool-category');
const { authCheck } = require('../helpers/helper.authorization');

ToolCategoryRouter.get('/tool-categories', authCheck, ToolCategoryController.getToolCategories);
ToolCategoryRouter.get(
  '/tool-categories/:toolCategoryId',
  authCheck,
  ToolCategoryController.getToolCategoryById
);
ToolCategoryRouter.post(
  '/tool-categories/create',
  authCheck,
  ToolCategoryController.createToolCategory
);
ToolCategoryRouter.put(
  '/tool-categories/:toolCategoryId',
  authCheck,
  ToolCategoryController.editToolCategory
);
ToolCategoryRouter.delete(
  '/tool-categories/:toolCategoryId',
  authCheck,
  ToolCategoryController.deleteToolCategory
);

module.exports = ToolCategoryRouter;
