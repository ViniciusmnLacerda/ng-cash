const { PrismaClient } = require('@prisma/client');
const hashPassword = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const SECRET = 'ngcash';
const twentyFourHours = 86400;

const getUsers = async () => {
  const users = await prisma.users.findMany();
  return users;
};

const login = async (user) => {
  const userWhoWantsTologin = await prisma.users
    .findMany({ where: { username: user.username }});
  const userId = userWhoWantsTologin[0].accountId;
  const token = jwt.sign({ userId }, SECRET, { expiresIn: twentyFourHours });
  return { auth: true, token };
}

const insertAccount = async () => {
const { id } =  await prisma.accounts.create({
    data: {
      balance: 100.00,
    }
  });
return id;
}

const signUp = async (user) => {
  const id = await insertAccount();
  const hashedPassword = await hashPassword(user.password);
  const newUser = await prisma.users.create({
    data: {
      username: user.username,
      password: hashedPassword,
      accountId: id,
    }
  });

  return { username: newUser.username, password: newUser.password };
}

module.exports = {
  getUsers,
  signUp,
  login,
};