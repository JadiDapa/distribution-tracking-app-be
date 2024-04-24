const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MaterialModel {
  async getAll() {
    return await prisma.material.findMany();
  }

  async getById(materialId) {
    return await prisma.material.findUnique({
      where: {
        id: parseInt(materialId)
      }
    });
  }

  async create(data) {
    return await prisma.material.create({
      data: data
    });
  }
}

module.exports = MaterialModel;
