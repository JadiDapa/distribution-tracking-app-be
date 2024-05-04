const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class VehicleVariantModel {
  async getAll() {
    return await prisma.vehicleVariant.findMany();
  }

  async getById(vehicleVariantId) {
    return await prisma.vehicleVariant.findUnique({
      where: {
        id: parseInt(vehicleVariantId)
      }
    });
  }

  async create(data) {
    return await prisma.vehicleVariant.create({
      data: data
    });
  }

  async editById(vehicleVariantId, newData) {
    return await prisma.vehicleVariant.update({
      where: {
        id: parseInt(vehicleVariantId)
      },
      data: newData
    });
  }

  async deleteById(vehicleVariantId) {
    return await prisma.vehicleVariant.delete({
      where: {
        id: parseInt(vehicleVariantId)
      }
    });
  }
}

module.exports = VehicleVariantModel;
