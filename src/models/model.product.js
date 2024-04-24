const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductModel {
  async getAll() {
    return await prisma.product.findMany();
  }

  async getById(productId) {
    return await prisma.product.findUnique({
      where: {
        id: parseInt(productId)
      }
    });
  }
}

module.exports = ProductModel;
