const express = require('express');
const ToolUpdatesRouter = express.Router();
const ToolUpdatesController = require('../controllers/controller.tool-updates');
const { authCheck } = require('../helpers/helper.authorization');

ToolUpdatesRouter.get(
  '/tool-updates/:accountId',
  authCheck,
  ToolUpdatesController.getToolUpdatesByAccountId
);
ToolUpdatesRouter.get(
  '/tool-updates/detail/:toolUpdateId',
  authCheck,
  ToolUpdatesController.getToolUpdateById
);

module.exports = ToolUpdatesRouter;
