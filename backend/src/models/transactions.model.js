const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getTransactions = async (accountId) => {
  const transactions = await prisma.transactions.findMany();
  const result = transactions.filter((transaction) => 
    transaction.debitedAccountId === accountId || transaction.creditedAccountId === accountId);
  result.map((transaction) => transaction.value = ( transaction.value / 100 ))
  return result;
};

  const findBalance = async (id) => {
    const [{ balance }] = await prisma.accounts.findMany({ where: { id }});
    return balance;
  }

const getBalance = async (username) => {
  const [{ accountId: id }] = await prisma.users.findMany({ where: { username }});
  const [{ balance }]  = await prisma.accounts.findMany({ where: { id }});
  return { balance, id };
}

const getAccountIds = async ({ userCredited, userDebited }) => {
  const [{ accountId: debitedAccountId }] = await prisma.users
    .findMany({ where: { username: userDebited }});
  const [{ accountId: creditedAccountId }] = await prisma.users
    .findMany({ where: { username: userCredited }});
  
  return { debitedAccountId, creditedAccountId };
}

const debited = async ({ userDebited, value }) => {
  const { balance, id } = await getBalance(userDebited);
  const result = Number(balance) - (Number(value) * 100);
  await prisma.accounts.update({
    where: {
      id,
    },
    data: {
      balance: result,
    },
  });
};

const credited = async ({ userCredited, value })  => {
  const { balance, id } = await getBalance(userCredited)
  const result = Number(balance) + (Number(value) * 100);
  await prisma.accounts.update({
    where: {
      id,
    },
    data: {
      balance: result,
    },
  });
};

const transfer = async (request) => {
  await debited(request);
  await credited(request);
  const { debitedAccountId, creditedAccountId } = await getAccountIds(request);
  const value = Number(request.value) * 100;
  await prisma.transactions.create({
    data: {
      debitedAccountId,
      creditedAccountId,
      value,
    },
  });

  return `Transfer from ${request.userDebited} to ${request.userCredited} successfully completed`;
};

module.exports = {
  getTransactions,
  transfer,
  findBalance,
}