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

  async acceptStock(request, items) {
    items.forEach(async (item) => {
      const getRequestedInventory = await prisma.materialInventory.findUnique({
        where: {
          materialId: parseInt(item.materialId),
          accountId: parseInt(request.requestedId)
        }
      });

      const getRequesterInventory = await prisma.materialInventory.findUnique({
        where: {
          materialId: parseInt(item.materialId),
          accountId: parseInt(request.requesterId)
        }
      });

      if (getRequestedInventory) {
        await prisma.materialInventory.update({
          where: {
            id: getRequestedInventory.id
          },
          data: {
            quantity: getRequestedInventory.quantity - item.quantity
          }
        });
      }

      if (getRequesterInventory) {
        await prisma.materialInventory.update({
          where: {
            id: getRequesterInventory.id
          },
          data: {
            quantity: getRequesterInventory.quantity + item.quantity
          }
        });
      } else {
        await prisma.materialInventory.create({
          data: {
            accountId: request.requesterId,
            materialId: item.materialId,
            quantity: item.quantity
          }
        });
      }
    });
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
