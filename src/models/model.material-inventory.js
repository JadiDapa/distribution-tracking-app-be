const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MaterialInventoryModel {
  async getAllByAccountId(accountId) {
    return await prisma.materialInventory.findMany({
      where: {
        accountId: parseInt(accountId)
      },
      include: {
        material: { select: { category: true, name: true, sku: true } }
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
      const getRequestedInventory = await prisma.materialInventory.findFirst({
        where: {
          materialId: parseInt(item.materialId),
          accountId: parseInt(request.requestedId)
        }
      });

      const getRequesterInventory = await prisma.materialInventory.findFirst({
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

  async postUpdate(data, items) {
    const getCode = await prisma.materialQuantityUpdate.findFirst({
      orderBy: {
        id: 'desc'
      }
    });
    let newCode;
    if (getCode) {
      newCode = String(Number(getCode.code) + 1);
    } else {
      newCode = '100001';
    }

    data.code = newCode;

    const postUpdater = await prisma.materialQuantityUpdate.create({
      data: data
    });

    if (postUpdater) {
      items.forEach(async (item) => {
        await prisma.materialQuantityItems.create({
          data: {
            materialId: item.materialId,
            quantity: item.quantity,
            MaterialQuantityUpdateId: postUpdater.id
          }
        });

        const getInventory = await prisma.materialInventory.findFirst({
          where: {
            accountId: data.accountId,
            materialId: item.materialId
          }
        });

        if (getInventory) {
          await prisma.materialInventory.update({
            where: {
              id: getInventory.id
            },
            data: {
              quantity: getInventory.quantity + item.quantity
            }
          });
        } else {
          await prisma.materialInventory.create({
            data: {
              accountId: data.accountId,
              materialId: item.materialId,
              quantity: item.quantity
            }
          });
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
