const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MaterialUpdatesModel {
  async getAllByAccountId(accountId) {
    return await prisma.materialQuantityUpdate.findMany({
      where: {
        accountId: parseInt(accountId)
      },
      include: {
        items: { select: { material: { select: { name: true, sku: true } }, quantity: true } }
      }
    });
  }

  async getById(materialUpdatesId) {
    return await prisma.materialQuantityUpdate.findUnique({
      where: {
        id: parseInt(materialUpdatesId)
      },
      include: {
        account: { select: { name: true } },
        items: { select: { material: { select: { name: true, sku: true } }, quantity: true } }
      }
    });
  }
}

module.exports = MaterialUpdatesModel;
