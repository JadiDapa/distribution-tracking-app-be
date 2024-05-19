const VehicleModel = require('../models/model.vehicle');
const vehicle = new VehicleModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class VehicleController {
  static async getVehicles(req, res) {
    try {
      const result = await vehicle.getAll();
      return SuccessResponse.Created(req, res, 'Vehicles Found', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getVehiclesByAccountId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const result = await vehicle.getAllByAccountId(accountId);
      return SuccessResponse.Created(req, res, 'Vehicles Found', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getVehicleById(req, res) {
    try {
      const vehicleId = parseInt(req.params.vehicleId);
      const result = await vehicle.getById(vehicleId);
      return SuccessResponse.Created(req, res, 'Vehicle Found', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async createVehicle(req, res) {
    try {
      const data = req.body;
      const pictureUrl = req.fileUrl;
      data.picture = pictureUrl;
      console.log(data);
      const result = await vehicle.create(data);
      return SuccessResponse.Created(req, res, 'Vehicle Created', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async editVehicle(req, res) {
    try {
      const vehicleId = parseInt(req.params.vehicleId);
      const data = req.body;
      console.log(data);
      const updatedRequest = await vehicle.editById(vehicleId, data);

      if (!updatedRequest) {
        return ErrorResponse.NotFound(req, res, error.message);
      }

      return SuccessResponse.Created(req, res, 'Vehicle Updated');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteVehicle(req, res) {
    try {
      const vehicleId = parseInt(req.params.vehicleId);
      const deletedRequest = await vehicle.deleteById(vehicleId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Vehicle not found');
      }
      return SuccessResponse.OK(req, res, 'Vehicle deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = VehicleController;
