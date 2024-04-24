const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ToolModel {
  async getAll() {
    return await prisma.tool.findMany();
  }

  async getById(toolId) {
    return await prisma.tool.findUnique({
      where: {
        id: parseInt(toolId)
      }
    });
  }

  async create(data) {
    return await prisma.tool.create({
      data: data
    });
  }
}

module.exports = ToolModel;
