const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ToolModel {
  async getAll() {
    return await prisma.tool.findMany({
      include: {
        category: { select: { category: true } }
      }
    });
  }

  async getById(toolId) {
    return await prisma.tool.findUnique({
      where: {
        id: parseInt(toolId)
      },
      include: {
        category: { select: { category: true } }
      }
    });
  }

  async create(data) {
    return await prisma.tool.create({
      data: data
    });
  }

  async editById(toolId, newData) {
    return await prisma.tool.update({
      where: {
        id: parseInt(toolId)
      },
      data: newData
    });
  }

  async deleteById(toolId) {
    return await prisma.tool.delete({
      where: {
        id: parseInt(toolId)
      }
    });
  }
}

module.exports = ToolModel;
