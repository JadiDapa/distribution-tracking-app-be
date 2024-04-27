const express = require('express');
const MaterialCategoryRouter = express.Router();
const MaterialCategoryController = require('../controllers/controller.material-category');
const { authCheck } = require('../helpers/helper.authorization');

MaterialCategoryRouter.get(
  '/material-categories',
  authCheck,
  MaterialCategoryController.getMaterialCategories
);
MaterialCategoryRouter.get(
  '/material-categories/:materialCategoryId',
  authCheck,
  MaterialCategoryController.getMaterialCategoryById
);
MaterialCategoryRouter.post(
  '/material-categories/create',
  authCheck,
  MaterialCategoryController.createMaterialCategory
);
MaterialCategoryRouter.put(
  '/material-categories/:materialCategoryId',
  authCheck,
  MaterialCategoryController.editMaterialCategory
);
MaterialCategoryRouter.delete(
  '/material-categories/:materialCategoryId',
  authCheck,
  MaterialCategoryController.deleteMaterialCategory
);

module.exports = MaterialCategoryRouter;
