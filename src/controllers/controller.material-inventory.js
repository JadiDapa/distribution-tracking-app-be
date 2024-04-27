const MaterialInventoryModel = require('../models/model.material-inventory');
const materialInventory = new MaterialInventoryModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class MaterialInventoryController {
  static async getMaterialInventoriesByAccountId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await materialInventory.getAllByAccountId(accountId);
      return SuccessResponse.DataFound(req, res, 'Material Categories Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getMaterialInventoryByAccountAndId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const materialInventoryId = parseInt(req.params.materialInventoryId);
      const results = await materialInventory.getByAccountAndId(accountId, materialInventoryId);
      return SuccessResponse.DataFound(req, res, 'Material Inventory Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async acceptMaterialStock(req, res) {
    try {
      const data = req.body;
      const result = await materialInventory.acceptStock(data);
      return SuccessResponse.Created(req, res, 'Material Received and Quantity Updated', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async editMaterialInventory(req, res) {
    try {
      const materialInventoryId = parseInt(req.params.materialInventoryId);
      const data = req.body;
      const { error } = await Validation.createMaterialInventory(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const updatedRequest = await materialInventory.editById(materialInventoryId, data);

      if (!updatedRequest) {
        return ErrorResponse.NotFound(req, res, error.message);
      }

      return SuccessResponse.Created(req, res, 'Material Inventory Updated');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteMaterialInventory(req, res) {
    try {
      const materialInventoryId = parseInt(req.params.materialInventoryId);
      const deletedRequest = await materialInventory.deleteById(materialInventoryId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Material  not found');
      }
      return SuccessResponse.OK(req, res, 'Material Inventory deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = MaterialInventoryController;
