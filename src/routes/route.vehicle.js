const express = require('express');
const VehicleRouter = express.Router();
const VehicleController = require('../controllers/controller.vehicle');

VehicleRouter.get('/vehicles', VehicleController.getVehicles);
VehicleRouter.get('/vehicles/:vehicleId', VehicleController.getVehicleById);
VehicleRouter.post('/vehicles/create', VehicleController.createVehicle);

module.exports = VehicleRouter;
