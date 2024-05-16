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

  async create(request, items) {
    const requestData = items.map((item) => {
      const commonData = {
        quantity: item.quantity,
        requestId: request.id
      };
      if (request.type === 'material') {
        return {
          ...commonData,
          materialId: parseInt(item.id)
        };
      } else if (request.type === 'tool') {
        return {
          ...commonData,
          toolId: parseInt(item.id)
        };
      }
    });

    const createdItems = await prisma.requestItem.createMany({
      data: requestData.filter(Boolean) // Filtering out undefined items
    });

    return createdItems;
  }

  async handleRequestItem(updatedRequest, items) {
    items.forEach(async (item) => {
      const getOldItem = await prisma.requestItem.findUnique({
        where: {
          id: parseInt(item.id)
        }
      });

      const itemData = {
        quantity: item.quantity,
        requestId: item.requestId,
        materialId: parseInt(item.materialId)
      };

      if (getOldItem) {
        await prisma.requestItem.update({
          where: {
            id: parseInt(item.id)
          },
          data: itemData
        });
      } else {
        await prisma.requestItem.create({
          data: itemData
        });
      }
    });

    const getItems = await prisma.requestItem.findMany({
      where: {
        requestId: parseInt(updatedRequest.id)
      }
    });

    const newMaterialIds = items.map((item) => item.materialId);

    getItems.forEach(async (oldItem) => {
      if (!newMaterialIds.includes(oldItem.materialId)) {
        await prisma.requestItem.delete({
          where: {
            id: parseInt(oldItem.id)
          }
        });
      }
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
