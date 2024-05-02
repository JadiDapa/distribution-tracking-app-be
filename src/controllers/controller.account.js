const AccountModel = require('../models/model.account');
const account = new AccountModel();
const responseHelper = require('../helpers/helper.response');
const bcrypt = require('bcrypt');
const response = require('../helpers/helper.error');
const { generateToken } = require('../helpers/helper.authorization');
const { loginAccount } = require('../helpers/helper.validation');
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class AccountController {
  static async getAccounts(req, res) {
    try {
      const results = await account.getAll();
      return SuccessResponse.DataFound(req, res, 'Accounts Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getAccountById(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await account.getById(accountId);
      return SuccessResponse.DataFound(req, res, 'Account Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async createAccount(req, res) {
    try {
      const data = req.body;
      const { error } = await Validation.createAccount(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const accountExist = await account.getByName(data);
      if (accountExist) {
        return ErrorResponse.Unauthorized(req, res, 'Account already exist');
      }
      const results = await account.create(data);
      return SuccessResponse.Created(req, res, 'Account Created', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async loginAccount(req, res) {
    try {
      const data = req.body;
      const { error } = await loginAccount(data);
      if (error) {
        return response.Unauthorized(req, res, error);
      }
      const result = await account.login(data);
      const token = generateToken({ id: result.id });
      result.token = token;
      return SuccessResponse.DataFound(req, res, 'Login Successfull', result);
    } catch (error) {
      return response.InternalServerError(req, res, error.message);
    }
  }

  static async editAccount(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const newData = req.body;
      const updatedAccount = await account.editById(accountId, newData);

      if (!updatedAccount) {
        return ErrorResponse.NotFound(req, res, 'Accounts Found', results);
      }

      return SuccessResponse.Created(req, res, 'Account Updated', results);
    } catch (error) {
      return response.InternalServerError(req, res, error.message);
    }
  }

  static async deleteAccount(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const deletedAccount = await account.deleteById(accountId);
      if (!deletedAccount) {
        return response.NotFound(req, res, 'Account not found');
      }
      return SuccessResponse.OK(req, res, 'Account Deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = AccountController;
