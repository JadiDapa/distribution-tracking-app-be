const AccountUnitModel = require('../models/model.account-unit');
const accountUnit = new AccountUnitModel();
const responseHelper = require('../helpers/helper.response');

class AccountUnitController {
  static async getAccountUnits(req, res) {
    try {
      const results = await accountUnit.getAll();
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async getAccountUnitById(req, res) {
    try {
      const accountUnitId = parseInt(req.params.accountUnitId);
      const results = await accountUnit.getById(accountUnitId);
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async createAccountUnit(req, res) {
    try {
      const data = req.body;
      const unitExist = await accountUnit.getByName(data.unit);
      if (unitExist) {
        return res.status(401).json({ error: 'Account Unit already exist!' });
      }
      const results = await accountUnit.create(data);
      return responseHelper(res, 201, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = AccountUnitController;
