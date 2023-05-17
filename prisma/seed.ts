import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  console.log('Seeding...');

  await prisma.user.createMany({
    data: [
      {
        email: 'mdwit0r+1@gmail.com',
        name: 'mdwit0r',
        password:
          '$2b$10$bglMMvpZoSKDTqVbr9IWLuNoQb.WKYSe0IUlUPluKV.U7yx826Hq.',
        role: 'USER',
      },
      {
        email: 'mdwit0r@gmail.com',
        name: 'mdwit',
        role: 'ADMIN',
        password:
          '$2b$10$bglMMvpZoSKDTqVbr9IWLuNoQb.WKYSe0IUlUPluKV.U7yx826Hq.',
      },
    ],
  });

  console.log('Seeding... Done');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
