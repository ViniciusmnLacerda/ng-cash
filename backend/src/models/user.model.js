const { PrismaClient } = require('@prisma/client');
const hashPassword = require('../utils/hashPassword');
const prisma = new PrismaClient();

const getUsers = async () => {
  const users = await prisma.users.findMany();
  return users;
};

const signIn = () => {
  
  return { message: { isLoginValid: true } }
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
  signIn,
};