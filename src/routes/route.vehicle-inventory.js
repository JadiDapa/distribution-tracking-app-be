const express = require('express');
const VehicleInventoryRouter = express.Router();
const VehicleInventoryController = require('../controllers/controller.vehicle-inventory ');
const { authCheck } = require('../helpers/helper.authorization');

VehicleInventoryRouter.get(
  '/vehicle-inventories/:accountId',
  authCheck,
  VehicleInventoryController.getVehicleInventoriesByAccountId
);

VehicleInventoryRouter.get(
  '/vehicle-inventories/:accountId/:vehicleInventoryId',
  authCheck,
  VehicleInventoryController.getVehicleInventoryByAccountAndId
);

VehicleInventoryRouter.post(
  '/vehicle-inventories/update',
  authCheck,
  VehicleInventoryController.updateVehicleQuantity
);

VehicleInventoryRouter.delete(
  '/vehicle-inventories/:vehicleInventoryId',
  authCheck,
  VehicleInventoryController.deleteVehicleInventory
);

module.exports = VehicleInventoryRouter;
