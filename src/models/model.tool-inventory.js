const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ToolInventoryModel {
  async getAllByAccountId(accountId) {
    return await prisma.toolInventory.findMany({
      where: {
        accountId: parseInt(accountId)
      },
      include: {
        tool: { select: { category: true, name: true, sku: true, expired_at: true } }
      }
    });
  }

  async getByAccountAndId(accountId, toolInventoryId) {
    return await prisma.toolInventory.findUnique({
      where: {
        id: parseInt(toolInventoryId),
        accountId: parseInt(accountId)
      }
    });
  }

  async acceptStock(request, items) {
    items.forEach(async (item) => {
      const getRequestedInventory = await prisma.toolInventory.findFirst({
        where: {
          toolId: parseInt(item.toolId),
          accountId: parseInt(request.requestedId)
        }
      });

      const getRequesterInventory = await prisma.toolInventory.findFirst({
        where: {
          toolId: parseInt(item.toolId),
          accountId: parseInt(request.requesterId)
        }
      });

      if (getRequestedInventory) {
        await prisma.toolInventory.update({
          where: {
            id: getRequestedInventory.id
          },
          data: {
            quantity: getRequestedInventory.quantity - item.quantity
          }
        });
      }

      if (getRequesterInventory) {
        await prisma.toolInventory.update({
          where: {
            id: getRequesterInventory.id
          },
          data: {
            quantity: getRequesterInventory.quantity + item.quantity
          }
        });
      } else {
        await prisma.toolInventory.create({
          data: {
            accountId: request.requesterId,
            toolId: item.toolId,
            quantity: item.quantity
          }
        });
      }
    });
  }

  async postUpdate(data, items) {
    const getCode = await prisma.toolQuantityUpdate.findFirst({
      orderBy: {
        id: 'desc'
      }
    });
    let newCode;
    if (getCode) {
      newCode = String(Number(getCode.code) + 1);
    } else {
      newCode = '200001';
    }

    data.code = newCode;

    const postUpdater = await prisma.toolQuantityUpdate.create({
      data: data
    });

    if (postUpdater) {
      items.forEach(async (item) => {
        await prisma.toolQuantityItems.create({
          data: {
            toolId: item.toolId,
            quantity: item.quantity,
            toolQuantityUpdateId: postUpdater.id
          }
        });

        const getInventory = await prisma.toolInventory.findFirst({
          where: {
            accountId: data.accountId,
            toolId: item.toolId
          }
        });

        if (getInventory) {
          await prisma.toolInventory.update({
            where: {
              id: getInventory.id
            },
            data: {
              quantity: getInventory.quantity + item.quantity
            }
          });
        } else {
          await prisma.toolInventory.create({
            data: {
              accountId: data.accountId,
              toolId: item.toolId,
              quantity: item.quantity
            }
          });
        }
      });
    }
  }

  async editById(toolInventoryId, newData) {
    return await prisma.toolInventory.update({
      where: {
        id: parseInt(toolInventoryId)
      },
      data: newData
    });
  }

  async deleteById(toolInventoryId) {
    return await prisma.toolInventory.delete({
      where: {
        id: parseInt(toolInventoryId)
      }
    });
  }
}

module.exports = ToolInventoryModel;
