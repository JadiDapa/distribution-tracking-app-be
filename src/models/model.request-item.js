const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RequestItemModel {
  async getAllByRequestId(requestId) {
    return await prisma.requestItem.findMany({
      where: {
        requestId: parseInt(requestId)
      },
      include: {
        material: { select: { name: true } },
        tool: { select: { name: true } }
      }
    });
  }

  async getById(requestItemId) {
    return await prisma.requestItem.findUnique({
      where: {
        id: parseInt(requestItemId)
      }
    });
  }

  async create(data) {
    return await prisma.requestItem.createMany({
      data: data
    });
  }

  async editById(requestItemId, newData) {
    return await prisma.requestItem.update({
      where: {
        id: parseInt(requestItemId)
      },
      data: newData
    });
  }

  async deleteById(requestItemId) {
    return await prisma.requestItem.delete({
      where: {
        id: parseInt(requestItemId)
      }
    });
  }
}

module.exports = RequestItemModel;
