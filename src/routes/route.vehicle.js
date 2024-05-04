const express = require('express');
const VehicleRouter = express.Router();
const VehicleController = require('../controllers/controller.vehicle');
const { authCheck, adminAuthCheck } = require('../helpers/helper.authorization');
const uploadMiddleware = require('../middleware/middleware.upload-file');

VehicleRouter.get('/vehicles', authCheck, VehicleController.getVehicles);
VehicleRouter.get('/vehicles/:accountId', authCheck, VehicleController.getVehiclesByAccountId);
VehicleRouter.get('/vehicles/:vehicleId', authCheck, VehicleController.getVehicleById);
VehicleRouter.post(
  '/vehicles/create',
  authCheck,
  adminAuthCheck,
  uploadMiddleware,
  VehicleController.createVehicle
);
VehicleRouter.put(
  '/vehicles/:vehicleId',
  authCheck,
  uploadMiddleware,
  VehicleController.editVehicle
);

module.exports = VehicleRouter;
