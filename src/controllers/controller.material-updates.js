const MaterialUpdatesModel = require('../models/model.material-updates');
const materialUpdates = new MaterialUpdatesModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');

class MaterialUpdatesController {
  static async getMaterialUpdatesByAccountId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await materialUpdates.getAllByAccountId(accountId);
      return SuccessResponse.DataFound(req, res, 'Material Updates Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getMaterialUpdateById(req, res) {
    try {
      const materialUpdateId = parseInt(req.params.materialUpdateId);
      const results = await materialUpdates.getById(materialUpdateId);
      return SuccessResponse.DataFound(req, res, 'Material Update Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = MaterialUpdatesController;
