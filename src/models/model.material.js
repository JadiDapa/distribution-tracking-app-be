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
    return await prisma.material.create({
      data: data
    });
  }

  async editById(materialId, newData) {
    return await prisma.material.update({
      where: {
        id: parseInt(materialId)
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
