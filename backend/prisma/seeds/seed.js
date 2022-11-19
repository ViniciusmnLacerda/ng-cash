const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const hashedPassword = require('../../src/utils/hashPassword');

async function main() {
  await prisma.accounts.create({
    data: {
      balance: 10000,
      users: {
        create: {
          username: "vinicius",
          password: await hashedPassword("Ngcash123"),
        },
      },
    },
  });

  await prisma.accounts.create({
    data: {
      balance: 10000,
      users: {
        create: {
          username: "marianne",
          password: await hashedPassword("Ngcash123"),
        },
      },
    },
  });

  await prisma.accounts.create({
    data: {
      balance: 10000,
      users: {
        create: {
          username: "igor",
          password: await hashedPassword("Ngcash123"),
        },
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })