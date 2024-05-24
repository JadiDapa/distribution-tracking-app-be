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
    newData.variantId = newData.variantId ? Number(newData.variantId) : newData.variantId;
    newData.areaId = newData.areaId ? Number(newData.areaId) : newData.areaId;
    newData.locationId = newData.locationId ? Number(newData.locationId) : newData.locationId;
    return await prisma.vehicle.update({
      where: {
        id: parseInt(vehicleId)
      },
      data: newData
    });
  }

  async deleteById(vehicleId) {
    return await prisma.vehicle.delete({
      where: {
        id: parseInt(vehicleId)
      }
    });
  }
}

module.exports = VehicleModel;
