const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MaterialInventoryModel {
  async getAllByAccountId(accountId) {
    return await prisma.materialInventory.findMany({
      where: {
        accountId: parseInt(accountId)
      }
    });
  }

  async getByAccountAndId(accountId, materialInventoryId) {
    return await prisma.materialInventory.findUnique({
      where: {
        id: parseInt(materialInventoryId),
        accountId: parseInt(accountId)
      }
    });
  }

  async acceptStock(data) {
    const getRequesterInventoryQuantity = await prisma.materialInventory.findFirst({
      where: {
        materialId: parseInt(data.materialId),
        accountId: parseInt(data.requesterId)
      }
    });

    const getRequestedInventoryQuantity = await prisma.materialInventory.findFirst({
      where: {
        materialId: parseInt(data.materialId),
        accountId: parseInt(data.requestedId)
      }
    });

    await prisma.materialInventory.update({
      where: {
        id: getRequestedInventoryQuantity.id
      },
      data: {
        quantity: getRequestedInventoryQuantity.quantity - data.quantity
      }
    });

    if (getRequesterInventoryQuantity) {
      return await prisma.materialInventory.update({
        where: {
          id: getRequesterInventoryQuantity.id
        },
        data: {
          quantity: getRequesterInventoryQuantity.quantity + data.quantity
        }
      });
    } else {
      return await prisma.materialInventory.create({
        data: {
          accountId: data.accountId,
          materialId: data.materialId,
          quantity: data.quantity
        }
      });
    }
  }

  async editById(materialInventoryId, newData) {
    return await prisma.materialInventory.update({
      where: {
        id: parseInt(materialInventoryId)
      },
      data: newData
    });
  }

  async deleteById(materialInventoryId) {
    return await prisma.materialInventory.delete({
      where: {
        id: parseInt(materialInventoryId)
      }
    });
  }
}

module.exports = MaterialInventoryModel;
