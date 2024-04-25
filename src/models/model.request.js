const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RequestModel {
  async getAllByUserId(accountId) {
    return await prisma.request.findMany({
      where: {
        requesterId: parseInt(accountId)
      },
      include: {
        requested: {
          select: { name: true }
        }
      }
    });
  }

  async getById(requestId, accountId) {
    return await prisma.request.findUnique({
      where: {
        id: parseInt(requestId),
        requesterId: parseInt(accountId)
      },
      include: {
        requested: {
          select: { name: true }
        },
        items: true
      }
    });
  }

  async create(data) {
    return await prisma.request.create({
      data: data
    });
  }

  async editById(accountId, newData) {
    return await prisma.account.update({
      where: {
        id: parseInt(accountId)
      },
      data: newData
    });
  }

  async deleteById(accountId) {
    return await prisma.account.delete({
      where: {
        id: parseInt(accountId)
      }
    });
  }
}

module.exports = RequestModel;
