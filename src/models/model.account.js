const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const response = require('../helpers/helper.error');

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
      }
    });
  }

  async getByName(name) {
    return await prisma.account.findUnique({
      where: {
        name: name
      }
    });
  }

  async create(data) {
    return await prisma.account.create({
      data: data
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
