const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class VehicleModel {
  async getAll() {
    return await prisma.vehicle.findMany({
      include: {
        variant: {
          select: { category: true }
        },
        area: {
          select: { name: true }
        },
        location: {
          select: { name: true }
        }
      }
    });
  }

  async getAllByAccountId(accountId) {
    return await prisma.vehicle.findMany({
      where: {
        locationId: accountId
      },
      include: {
        variant: {
          select: { category: true }
        },
        area: {
          select: { name: true }
        },
        location: {
          select: { name: true }
        }
      }
    });
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
      data: {
        police_number: data.police_number,
        variantId: parseInt(data.variantId),
        brand: data.brand,
        detail: data.detail,
        manufacture_year: data.manufacture_year,
        contract_start: data.contract_start,
        contract_end: data.contract_end,
        areaId: parseInt(data.areaId),
        locationId: parseInt(data.locationId),
        picture: data.picture
      }
    });
  }

  async editById(vehicleId, newData) {
    return await prisma.vehicle.update({
      where: { id: parseInt(vehicleId) },
      data: newData
    });
  }
}

module.exports = VehicleModel;
