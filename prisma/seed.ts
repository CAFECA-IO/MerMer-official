// seed.ts
import { PrismaClient } from '@prisma/client';
import { seedUser } from './seeders/seed_user';

const prisma = new PrismaClient();
async function main() {
  await seedUserData(prisma);
  // 可以继续添加更多的种子函数调用
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 如果您使用的是 Prisma Client，请确保在脚本结束时断开连接
    await prisma.$disconnect();
  });
