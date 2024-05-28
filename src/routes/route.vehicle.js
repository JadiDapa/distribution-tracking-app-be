const express = require('express');
const VehicleRouter = express.Router();
const VehicleController = require('../controllers/controller.vehicle');
const { authCheck, adminAuthCheck } = require('../helpers/helper.authorization');
const uploadMiddleware = require('../middleware/middleware.upload-file');

VehicleRouter.get('/vehicles', authCheck, VehicleController.getVehicles);
VehicleRouter.get('/vehicles/:accountId', authCheck, VehicleController.getVehiclesByAccountId);
VehicleRouter.get('/vehicles/detail/:vehicleId', authCheck, VehicleController.getVehicleById);
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
VehicleRouter.delete(
  '/vehicles/:vehicleId',
  authCheck,
  adminAuthCheck,
  VehicleController.deleteVehicle
);

module.exports = VehicleRouter;
