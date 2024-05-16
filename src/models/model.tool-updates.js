const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ToolUpdatesModel {
  async getAllByAccountId(accountId) {
    return await prisma.toolQuantityUpdate.findMany({
      where: {
        accountId: parseInt(accountId)
      },
      include: {
        items: { select: { tool: { select: { name: true, sku: true } }, quantity: true } }
      }
    });
  }

  async getById(toolUpdatesId) {
    return await prisma.toolQuantityUpdate.findUnique({
      where: {
        id: parseInt(toolUpdatesId)
      },
      include: {
        account: { select: { name: true } },
        items: { select: { tool: { select: { name: true, sku: true } }, quantity: true } }
      }
    });
  }
}

module.exports = ToolUpdatesModel;
