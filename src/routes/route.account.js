const express = require('express');
const AccountRouter = express.Router();
const AccountController = require('../controllers/controller.account');
const { authCheck, adminAuthCheck } = require('../helpers/helper.authorization');

AccountRouter.get('/accounts', authCheck, adminAuthCheck, AccountController.getAccounts);
AccountRouter.get('/accounts/:accountId', authCheck, AccountController.getAccountById);
AccountRouter.post('/accounts/create', authCheck, adminAuthCheck, AccountController.createAccount);
AccountRouter.post('/accounts/login', AccountController.loginAccount);
AccountRouter.put('/accounts/:accountId', authCheck, adminAuthCheck, AccountController.editAccount);
AccountRouter.delete(
  '/accounts/:accountId',
  authCheck,
  adminAuthCheck,
  AccountController.deleteAccount
);

module.exports = AccountRouter;
