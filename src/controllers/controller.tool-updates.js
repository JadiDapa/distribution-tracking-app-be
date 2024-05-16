const ToolUpdatesModel = require('../models/model.tool-updates');
const toolUpdates = new ToolUpdatesModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');

class ToolUpdatesController {
  static async getToolUpdatesByAccountId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await toolUpdates.getAllByAccountId(accountId);
      return SuccessResponse.DataFound(req, res, 'Tool Updates Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getToolUpdateById(req, res) {
    try {
      const toolUpdateId = parseInt(req.params.toolUpdateId);
      const results = await toolUpdates.getById(toolUpdateId);
      return SuccessResponse.DataFound(req, res, 'Tool Update Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = ToolUpdatesController;
