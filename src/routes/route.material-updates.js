const express = require('express');
const MaterialUpdatesRouter = express.Router();
const MaterialUpdatesController = require('../controllers/controller.material-updates');
const { authCheck } = require('../helpers/helper.authorization');

MaterialUpdatesRouter.get(
  '/material-updates/:accountId',
  authCheck,
  MaterialUpdatesController.getMaterialUpdatesByAccountId
);
MaterialUpdatesRouter.get(
  '/material-updates/detail/:materialUpdateId',
  authCheck,
  MaterialUpdatesController.getMaterialUpdateById
);

module.exports = MaterialUpdatesRouter;
