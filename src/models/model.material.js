const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MaterialModel {
  async getAll() {
    return await prisma.material.findMany({
      include: {
        category: { select: { category: true } }
      }
    });
  }

  async getById(materialId) {
    return await prisma.material.findUnique({
      where: {
        id: parseInt(materialId)
      },
      include: {
        category: { select: { category: true } }
      }
    });
  }

  async create(data) {
    data.categoryId = parseInt(data.categoryId);
    return await prisma.material.create({
      data: data
    });
  }

  async editById(vehicleId, newData) {
    newData.categoryId = parseInt(newData.categoryId);
    return await prisma.material.update({
      where: {
        id: parseInt(vehicleId)
      },
      data: newData
    });
  }

  async deleteById(materialId) {
    return await prisma.material.delete({
      where: {
        id: parseInt(materialId)
      }
    });
  }
}

module.exports = MaterialModel;
