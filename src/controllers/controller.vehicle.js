const VehicleModel = require('../models/model.vehicle');
const vehicle = new VehicleModel();
const responseHelper = require('../helpers/helper.response');

class VehicleController {
  static async getVehicles(req, res) {
    try {
      const results = await vehicle.getAll();
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async getVehicleById(req, res) {
    try {
      const vehicleId = parseInt(req.params.vehicleId);
      const results = await vehicle.getById(vehicleId);
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async createVehicle(req, res) {
    try {
      const data = req.body;
      const results = await vehicle.create(data);
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

module.exports = VehicleController;
