const VehicleVariantModel = require('../models/model.vehicle-variant');
const vehicleVariant = new VehicleVariantModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class VehicleVariantController {
  static async getVehicleVariants(req, res) {
    try {
      const results = await vehicleVariant.getAll();
      return SuccessResponse.DataFound(req, res, 'Vehicle Variant Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getVehicleVariantById(req, res) {
    try {
      const vehicleVariantId = parseInt(req.params.vehicleVariantId);
      const results = await vehicleVariant.getById(vehicleVariantId);
      return SuccessResponse.DataFound(req, res, 'Vehicle Variant Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async createVehicleVariant(req, res) {
    try {
      const data = req.body;
      const result = await vehicleVariant.create(data);
      return SuccessResponse.Created(req, res, 'Vehicle Variant Created', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async editVehicleVariant(req, res) {
    try {
      const vehicleVariantId = parseInt(req.params.vehicleVariantId);
      const data = req.body;
      const updatedRequest = await vehicleVariant.editById(vehicleVariantId, data);

      if (!updatedRequest) {
        return ErrorResponse.NotFound(req, res, error.message);
      }

      return SuccessResponse.Created(req, res, 'Vehicle Variant Updated');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteVehicleVariant(req, res) {
    try {
      const vehicleVariantId = parseInt(req.params.vehicleVariantId);
      const deletedRequest = await vehicleVariant.deleteById(vehicleVariantId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Vehicle Variant not found');
      }
      return SuccessResponse.OK(req, res, 'Vehicle Variant deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = VehicleVariantController;
