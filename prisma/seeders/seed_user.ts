import { PrismaClient, Role } from '@prisma/client';
import type { UsersArray } from '../jsons/interface/user_data_interface';
import userData from '../jsons/user_data.json'
import { getOrCreateJobTitle } from '../seeder-helpers/get_or_create';

export async function seedUser(prisma: PrismaClient): Promise<void> {
  const usersArray: UsersArray = userData;

  for (const user of usersArray) {

    const role: Role = isRoleKey(user.role) ? Role[user.role] : Role.USER
    const twJobTitleId = await getOrCreateJobTitle(user.twUserData.jobTitle, prisma)
    const cnJobTitleId = await getOrCreateJobTitle(user.cnUserData.jobTitle, prisma)
    const enJobTitleId = await getOrCreateJobTitle(user.enUserData.jobTitle, prisma)
    await prisma.user.upsert({
      where: { id: user.id},
      update: {},
      create: {
        id: user.id,
        email: user.email,
        signer: user.signer,
        role: role,
        avatar: user.avatar || null,
        twUserData: {
          create: {
            name: user.twUserData.name,
            intro: user.twUserData.intro,
            jobTitleId: twJobTitleId
          }
        },
        enUserData: {
          create: {
            name: user.enUserData.name,
            intro: user.enUserData.intro,
            jobTitleId: enJobTitleId
          }
        },
        cnUserData: {
          create: {
            name: user.cnUserData.name,
            intro: user.cnUserData.intro,
            jobTitleId: cnJobTitleId
          }
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  }
  usersArray 

}

function isRoleKey(key: string): key is keyof typeof Role {
  return key in Role;
}
