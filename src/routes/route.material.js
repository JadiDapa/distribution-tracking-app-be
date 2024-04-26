const express = require('express');
const MaterialRouter = express.Router();
const MaterialController = require('../controllers/controller.material');
const { authCheck } = require('../helpers/helper.authorization');

MaterialRouter.get('/materials', authCheck, MaterialController.getMaterials);
MaterialRouter.get('/materials/:materialId', authCheck, MaterialController.getMaterialById);
MaterialRouter.post('/materials/create', authCheck, MaterialController.createMaterial);
MaterialRouter.put('/materials/:materialId', authCheck, MaterialController.editMaterial);
MaterialRouter.delete('/materials/:materialId', authCheck, MaterialController.deleteMaterial);

module.exports = MaterialRouter;
