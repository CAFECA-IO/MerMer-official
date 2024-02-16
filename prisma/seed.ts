// seed.ts
import { PrismaClient } from '@prisma/client';
import { seedUser } from './seeders/seed_user';
import { seedKm } from './seeders/seed_km';

const prisma = new PrismaClient();
async function main() {
  await seedUser(prisma);
  await seedKm(prisma);
}

main()
  .catch((e) => {
    // Till: (20240316 - Murky) handle error
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Info: (20240117 - Murky) disconnect when everythings is done
    await prisma.$disconnect();
  });
