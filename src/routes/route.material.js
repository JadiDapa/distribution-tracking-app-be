const express = require('express');
const MaterialRouter = express.Router();
const MaterialController = require('../controllers/controller.material');
const { authCheck, adminAuthCheck } = require('../helpers/helper.authorization');
const uploadMiddleware = require('../middleware/middleware.upload-file');

MaterialRouter.get('/materials', MaterialController.getMaterials);
MaterialRouter.get('/materials/:materialId', authCheck, MaterialController.getMaterialById);
MaterialRouter.post(
  '/materials/create',
  authCheck,
  adminAuthCheck,
  uploadMiddleware,
  MaterialController.createMaterial
);
MaterialRouter.put(
  '/materials/:materialId',
  authCheck,
  adminAuthCheck,
  uploadMiddleware,
  MaterialController.editMaterial
);
MaterialRouter.delete(
  '/materials/:materialId',
  authCheck,
  adminAuthCheck,
  MaterialController.deleteMaterial
);

module.exports = MaterialRouter;
