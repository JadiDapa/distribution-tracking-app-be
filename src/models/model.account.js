const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class AccountModel {
  async getAll() {
    return await prisma.account.findMany({
      include: {
        unit: true
      }
    });
  }

  async getById(accountId) {
    return await prisma.account.findUnique({
      where: {
        id: parseInt(accountId)
      },
      include: {
        unit: true,
        higherAccount: {
          include: { unit: true }
        },
        lowerAccounts: {
          include: { unit: true }
        }
      }
    });
  }

  async getByName(data) {
    return await prisma.account.findUnique({
      where: {
        name: data.name
      }
    });
  }

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    if (data.unitId === 2) {
      data.higherAccountId = 1;
    }
    return await prisma.account.create({
      data: {
        name: data.name,
        user: data.user,
        password: hashedPassword,
        higherAccountId: data.higherAccountId,
        status: data.status,
        unitId: data.unitId
      }
    });
  }

  async login(data) {
    const account = await prisma.account.findUnique({
      where: {
        name: data.name
      }
    });
    if (!account) {
      throw new Error('Invalid email or password');
    }
    const isValid = await bcrypt.compare(data.password, account.password);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    return account;
  }

  async editById(accountId, newData) {
    return await prisma.account.update({
      where: {
        id: parseInt(accountId)
      },
      data: newData
    });
  }

  async deleteById(accountId) {
    return await prisma.account.delete({
      where: {
        id: parseInt(accountId)
      }
    });
  }
}

module.exports = AccountModel;
