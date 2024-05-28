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
    // Store promises for each operation to wait for all to complete later
    const promises = [];

    // Handle create or update operations
    for (const item of items) {
      const getOldItemPromise = prisma.requestItem.findUnique({
        where: {
          id: parseInt(item.id)
        }
      });

      const getOldItem = await getOldItemPromise;

      const itemData = {
        quantity: item.quantity,
        requestId: item.requestId,
        materialId: item.materialId ? parseInt(item.materialId) : null,
        toolId: item.toolId ? parseInt(item.toolId) : null
      };

      if (getOldItem) {
        promises.push(
          prisma.requestItem.update({
            where: {
              id: parseInt(item.id)
            },
            data: itemData
          })
        );
      } else {
        promises.push(
          prisma.requestItem.create({
            data: itemData
          })
        );
      }
    }

    // Wait for all create/update operations to complete
    await Promise.all(promises);

    // Fetch all items related to the updated request
    const getItems = await prisma.requestItem.findMany({
      where: {
        requestId: parseInt(updatedRequest.id)
      }
    });

    // Collect deletion promises
    const deletionPromises = [];

    // Get new material and tool IDs from the updated items
    const newMaterialIds = items
      .filter((item) => item.materialId)
      .map((item) => parseInt(item.materialId));
    const newToolIds = items.filter((item) => item.toolId).map((item) => parseInt(item.toolId));

    // Delete items that are no longer present
    getItems.forEach((oldItem) => {
      if (oldItem.materialId && !newMaterialIds.includes(oldItem.materialId)) {
        deletionPromises.push(
          prisma.requestItem.delete({
            where: {
              id: parseInt(oldItem.id)
            }
          })
        );
      }
      if (oldItem.toolId && !newToolIds.includes(oldItem.toolId)) {
        deletionPromises.push(
          prisma.requestItem.delete({
            where: {
              id: parseInt(oldItem.id)
            }
          })
        );
      }
    });

    // Wait for all deletion operations to complete
    await Promise.all(deletionPromises);

    // Return the updated list of items
    return prisma.requestItem.findMany({
      where: {
        requestId: parseInt(updatedRequest.id)
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
