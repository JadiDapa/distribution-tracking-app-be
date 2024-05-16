const ToolInventoryModel = require('../models/model.tool-inventory');
const toolInventory = new ToolInventoryModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class ToolInventoryController {
  static async getToolInventoriesByAccountId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await toolInventory.getAllByAccountId(accountId);
      return SuccessResponse.DataFound(req, res, 'Tool Categories Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getToolInventoryByAccountAndId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const toolInventoryId = parseInt(req.params.toolInventoryId);
      const results = await toolInventory.getByAccountAndId(accountId, toolInventoryId);
      return SuccessResponse.DataFound(req, res, 'Tool Inventory Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async acceptToolStock(req, res) {
    try {
      const data = req.body;
      const result = await toolInventory.acceptStock(data);
      return SuccessResponse.Created(req, res, 'Tool Received and Quantity Updated', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
  static async updateToolQuantity(req, res) {
    try {
      const { items, ...data } = req.body;
      const { error } = await Validation.updateToolInventory(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const postUpdate = await toolInventory.postUpdate(data, items);

      return SuccessResponse.Created(req, res, 'Tool Inventory Updated');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteToolInventory(req, res) {
    try {
      const toolInventoryId = parseInt(req.params.toolInventoryId);
      const deletedRequest = await toolInventory.deleteById(toolInventoryId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Tool  not found');
      }
      return SuccessResponse.OK(req, res, 'Tool Inventory deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = ToolInventoryController;
