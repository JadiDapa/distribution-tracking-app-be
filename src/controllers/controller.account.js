const AccountModel = require('../models/model.account');
const account = new AccountModel();
const responseHelper = require('../helpers/helper.response');
const bcrypt = require('bcrypt');
const response = require('../helpers/helper.error');
const { generateToken } = require('../helpers/helper.authorization');
const { loginAccount } = require('../helpers/helper.validation');

class AccountController {
  static async getAccounts(req, res) {
    try {
      const results = await account.getAll();
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async getAccountById(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await account.getById(accountId);
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async createAccount(req, res) {
    try {
      const { name, password, ...data } = req.body;
      if (!name && !password) {
        return response.Unauthorized(req, res, 'All field must be filled');
      }
      const accountExist = await account.getByName(name);
      console.log(accountExist, 'already exist');
      if (accountExist) {
        return response.Unauthorized(req, res, 'Account already exist');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const results = await account.create({ name, password: hashedPassword, ...data });
      console.log(results);
      return response.Created(req, res, 'Account created successfully!', results);
    } catch (error) {
      return response.InternalServerError(req, res, error.message);
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
      return response.DataFound(req, res, 'Login success', result);
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
        return response.NotFound(req, res, 'Account not found');
      }

      return response.Success(req, res, 'Account updated successfully', updatedAccount);
    } catch (error) {
      return response.InternalServerError(req, res, error.message);
    }
  }

  static async deleteAccount(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      console.log(accountId);
      const deletedAccount = await account.deleteById(accountId);
      console.log(deletedAccount);
      if (!deletedAccount) {
        return response.NotFound(req, res, 'Account not found');
      }
      return response.Success(req, res, 'Account deleted successfully');
    } catch (error) {
      return response.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = AccountController;
