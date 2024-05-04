const express = require('express');
const MaterialInventoryRouter = express.Router();
const MaterialInventoryController = require('../controllers/controller.material-inventory');
const { authCheck } = require('../helpers/helper.authorization');

MaterialInventoryRouter.get(
  '/material-inventories/:accountId',
  authCheck,
  MaterialInventoryController.getMaterialInventoriesByAccountId
);
MaterialInventoryRouter.get(
  '/material-inventories/:accountId/:materialInventoryId',
  authCheck,
  MaterialInventoryController.getMaterialInventoryByAccountAndId
);
MaterialInventoryRouter.post(
  '/material-inventories/update',
  authCheck,
  MaterialInventoryController.updateMaterialQuantity
);

MaterialInventoryRouter.delete(
  '/material-inventories/:materialInventoryId',
  authCheck,
  MaterialInventoryController.deleteMaterialInventory
);

module.exports = MaterialInventoryRouter;
