const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AccountUnitModel {
  async getAll() {
    return await prisma.accountUnit.findMany();
  }

  async getById(accountUnitId) {
    return await prisma.accountUnit.findUnique({
      where: {
        id: parseInt(accountUnitId)
      }
    });
  }

  async getByName(unit) {
    return await prisma.accountUnit.findUnique({
      where: {
        unit: unit
      }
    });
  }

  async create(data) {
    return await prisma.accountUnit.create({
      data: data
    });
  }
}

module.exports = AccountUnitModel;
