const express = require('express');
const ToolInventoryRouter = express.Router();
const ToolInventoryController = require('../controllers/controller.tool-inventory');
const { authCheck } = require('../helpers/helper.authorization');

ToolInventoryRouter.get(
  '/tool-inventories/:accountId',
  authCheck,
  ToolInventoryController.getToolInventoriesByAccountId
);
ToolInventoryRouter.get(
  '/tool-inventories/:accountId/:toolInventoryId',
  authCheck,
  ToolInventoryController.getToolInventoryByAccountAndId
);
ToolInventoryRouter.post(
  '/tool-inventories/update',
  authCheck,
  ToolInventoryController.updateToolQuantity
);

ToolInventoryRouter.delete(
  '/tool-inventories/:toolInventoryId',
  authCheck,
  ToolInventoryController.deleteToolInventory
);

module.exports = ToolInventoryRouter;
