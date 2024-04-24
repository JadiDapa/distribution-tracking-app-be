const express = require('express');
const MaterialRouter = express.Router();
const MaterialController = require('../controllers/controller.material');
const { authCheck } = require('../helpers/helper.authorization');

MaterialRouter.get('/materials', authCheck, MaterialController.getMaterials);
MaterialRouter.get('/materials/:materialId', MaterialController.getMaterialById);
MaterialRouter.post('/materials/create', MaterialController.createMaterial);

module.exports = MaterialRouter;
