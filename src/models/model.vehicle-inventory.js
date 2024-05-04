const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class VehicleInventoryModel {
  async getAllByAccountId(accountId) {
    return await prisma.vehicleInventory.findMany({
      where: {
        accountId: parseInt(accountId)
      },
      include: {
        vehicle: { select: { brand: true, police_number: true } }
      }
    });
  }

  async getByAccountAndId(accountId, vehicleInventoryId) {
    return await prisma.vehicleInventory.findUnique({
      where: {
        id: parseInt(vehicleInventoryId),
        accountId: parseInt(accountId)
      }
    });
  }

  async editById(vehicleInventoryId, newData) {
    return await prisma.vehicleInventory.update({
      where: {
        id: parseInt(vehicleInventoryId)
      },
      data: newData
    });
  }

  async deleteById(vehicleInventoryId) {
    return await prisma.vehicleInventory.delete({
      where: {
        id: parseInt(vehicleInventoryId)
      }
    });
  }
}

module.exports = VehicleInventoryModel;
