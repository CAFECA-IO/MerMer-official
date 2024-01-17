import { PrismaClient, Role } from '@prisma/client';
import type { UsersArray } from '../jsons/interface/user_data_interface';
import userData from '../jsons/user_data.json'

export async function seedUser(prisma: PrismaClient): Promise<void> {
  const usersArray: UsersArray = userData;

  for (const user of usersArray) {

    const role: Role = isRoleKey(user.role) ? Role[user.role] : Role.USER

    await prisma.user.upsert({
      where: { id: user.id},
      update: {},
      create: {
        id: user.id,
        email: user.email,
        signer: user.signer,
        role: role,
        avatar: user.avatar || null,


      }
    })
  }
  usersArray 

}

function isRoleKey(key: string): key is keyof typeof Role {
  return key in Role;
}