const VehicleInventoryModel = require('../models/model.vehicle-inventory');
const vehicleInventory = new VehicleInventoryModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class VehicleInventoryController {
  static async getVehicleInventoriesByAccountId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await vehicleInventory.getAllByAccountId(accountId);
      return SuccessResponse.DataFound(req, res, 'Vehicle Inventories Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getVehicleInventoryByAccountAndId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const vehicleInventoryId = parseInt(req.params.vehicleInventoryId);
      const results = await vehicleInventory.getByAccountAndId(accountId, vehicleInventoryId);
      return SuccessResponse.DataFound(req, res, 'Vehicle Inventory Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async acceptVehicleStock(req, res) {
    try {
      const data = req.body;
      const result = await vehicleInventory.acceptStock(data);
      return SuccessResponse.Created(req, res, 'Vehicle Received and Quantity Updated', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
  static async updateVehicleQuantity(req, res) {
    try {
      const { items, ...data } = req.body;
      const { error } = await Validation.updateVehicleInventory(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const postUpdate = await vehicleInventory.postUpdate(data, items);

      return SuccessResponse.Created(req, res, 'Vehicle Inventory Updated');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteVehicleInventory(req, res) {
    try {
      const vehicleInventoryId = parseInt(req.params.vehicleInventoryId);
      const deletedRequest = await vehicleInventory.deleteById(vehicleInventoryId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Vehicle Inventory not found');
      }
      return SuccessResponse.OK(req, res, 'Vehicle Inventory deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = VehicleInventoryController;
