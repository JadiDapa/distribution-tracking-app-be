const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class VehicleModel {
  async getAll() {
    return await prisma.vehicle.findMany();
  }

  async getById(vehicleId) {
    return await prisma.vehicle.findUnique({
      where: {
        id: parseInt(vehicleId)
      }
    });
  }

  async create(data) {
    return await prisma.vehicle.create({
      data: data
    });
  }
}

module.exports = VehicleModel;
