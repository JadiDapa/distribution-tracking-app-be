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
        },
        items: true
      }
    });
  }

  async getAllByRequestedId(accountId) {
    return await prisma.request.findMany({
      where: {
        requestedId: parseInt(accountId)
      },
      include: {
        requested: {
          select: { name: true }
        },
        requester: {
          select: { name: true }
        },
        items: true
      }
    });
  }

  async getById(requestId) {
    return await prisma.request.findUnique({
      where: {
        id: parseInt(requestId)
      },
      include: {
        requested: {
          select: { name: true }
        },
        requester: {
          select: { name: true }
        },
        items: {
          include: { material: true, tool: true }
        }
      }
    });
  }

  async create(data) {
    const getCode = await prisma.request.findFirst({
      orderBy: {
        id: 'desc'
      }
    });
    let newCode;
    if (getCode) {
      newCode = String(getCode.id + 1).padStart(6, '0');
    } else {
      newCode = '000001';
    }

    data.code = newCode;
    return await prisma.request.create({
      data: data
    });
  }

  async editById(accountId, newData) {
    return await prisma.request.update({
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
