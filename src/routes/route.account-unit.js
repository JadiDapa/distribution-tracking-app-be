const express = require('express');
const AccountUnitRouter = express.Router();
const AccountUnitController = require('../controllers/controller.account-unit');
const { authCheck, adminAuthCheck } = require('../helpers/helper.authorization');

AccountUnitRouter.get('/account-units', AccountUnitController.getAccountUnits);
AccountUnitRouter.get('/account-units/:accountUnitId', AccountUnitController.getAccountUnitById);
AccountUnitRouter.post(
  '/account-units/create',

  AccountUnitController.createAccountUnit
);

module.exports = AccountUnitRouter;
