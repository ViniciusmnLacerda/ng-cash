const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getTransactions = async () => {
  const transactions = await prisma.transactions.findMany();
  return transactions;
}

module.exports = {
  getTransactions,
}