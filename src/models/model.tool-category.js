const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ToolCategoryModel {
  async getAll() {
    return await prisma.toolCat.findMany();
  }

  async getById(toolCategoryId) {
    return await prisma.toolCat.findUnique({
      where: {
        id: parseInt(toolCategoryId)
      }
    });
  }

  async create(data) {
    return await prisma.toolCat.create({
      data: data
    });
  }

  async editById(toolCategoryId, newData) {
    return await prisma.toolCat.update({
      where: {
        id: parseInt(toolCategoryId)
      },
      data: newData
    });
  }

  async deleteById(toolCategoryId) {
    return await prisma.toolCat.delete({
      where: {
        id: parseInt(toolCategoryId)
      }
    });
  }
}

module.exports = ToolCategoryModel;
