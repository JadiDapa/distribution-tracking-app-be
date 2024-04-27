const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MaterialCategoryModel {
  async getAll() {
    return await prisma.materialCat.findMany();
  }

  async getById(materialCategoryId) {
    return await prisma.materialCat.findUnique({
      where: {
        id: parseInt(materialCategoryId)
      }
    });
  }

  async create(data) {
    return await prisma.materialCat.create({
      data: data
    });
  }

  async editById(materialCategoryId, newData) {
    return await prisma.materialCat.update({
      where: {
        id: parseInt(materialCategoryId)
      },
      data: newData
    });
  }

  async deleteById(materialCategoryId) {
    return await prisma.materialCat.delete({
      where: {
        id: parseInt(materialCategoryId)
      }
    });
  }
}

module.exports = MaterialCategoryModel;
