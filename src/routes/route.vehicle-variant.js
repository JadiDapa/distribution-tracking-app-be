const express = require('express');
const VehicleVariantRouter = express.Router();
const VehicleVariantController = require('../controllers/controller.vehicle-variant');
const { authCheck } = require('../helpers/helper.authorization');

VehicleVariantRouter.get(
  '/vehicle-variants',
  authCheck,
  VehicleVariantController.getVehicleVariants
);
VehicleVariantRouter.get(
  '/vehicle-variants/:vehicleVariantId',
  authCheck,
  VehicleVariantController.getVehicleVariantById
);
VehicleVariantRouter.post(
  '/vehicle-variants/create',
  authCheck,
  VehicleVariantController.createVehicleVariant
);
VehicleVariantRouter.put(
  '/vehicle-variants/:vehicleVariantId',
  authCheck,
  VehicleVariantController.editVehicleVariant
);
VehicleVariantRouter.delete(
  '/vehicle-variants/:vehicleVariantId',
  authCheck,
  VehicleVariantController.deleteVehicleVariant
);

module.exports = VehicleVariantRouter;
