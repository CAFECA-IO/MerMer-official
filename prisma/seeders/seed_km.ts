import { type PrismaClient } from '@prisma/client';
import * as KmHelper from '../seeder-helpers/seed_km_helper';
import { seederConfig } from '../seed_config';

export async function seedUserData(prisma: PrismaClient): Promise<void> {

  try {
    // Info: (20240116 - Murky) in seeder every topic of KM is "general"
    const TOPIC_ = 'general';

    // Info: (20240116 - Murky) first, get all KM from /src/km
    const slugs = await KmHelper.getSlugs(seederConfig.kmMdPath);
    const allKMs = await Promise.all(
      slugs.map(slug => {
        return KmHelper.getPost(seederConfig.kmMdPath, slug);
      })
    );

    // Info: (20240116 - Murky) we already create user in seed_user, so we need to connect it to km
    const users = await prisma.user.findMany({
      select: {
        userId: true, // Info: (20240116 - Murky) userId is serial autoincrease Int id, is primary key
        id: true  // Info: (20240116 - Murky) id is string use in url, not primary key
      }
    });

    // Info: (20240116 - Murky) change {userId: number, id: string} to {userId: id} for O(1) searching when upsert
    const userIdMapping: { [key: string]: number } = {};

    users.forEach(user => {
      userIdMapping[user.id] = user.userId;
    });

    // Info: (20240116 - Murky) create or get id when topic already exist
    const topicId = await getOrCreateTopic(TOPIC_, prisma);

    for(const km of allKMs) {
      // Info: (20240116 - Murky) create or get categories when topic already exist
      // prisma do not allow create twice when @unique constrain is used
      const categoryIds = await Promise.all(
        km.categories.map(categoryName => getOrCreateCategory(categoryName, prisma))
      );
      await prisma.km.upsert({
        where: {id: km.id},
        update: {},
        create: {
          id: km.id,
          title: km.title,
          authorId: userIdMapping[km.authorId],
          picture: km.picture,
          description: km.description,
          mdFile: km.mdFile,
          categories: {
            connect: categoryIds.map(id => ({ id }))
          },
          topicId: topicId,
          createdAt: km.date,
          updatedAt: km.date
        }
      })
    }

  }catch(e) {
    return
  }
}

async function getOrCreateCategory(name: string, prisma: PrismaClient): Promise<number> {
  let category = await prisma.category.findFirst({
    where: { name }
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name }
    });
  }

  return category.id;
}

async function getOrCreateTopic(topicName: string, prisma: PrismaClient): Promise<number> {
  let topic = await prisma.topic.findFirst({
    where: { name: topicName }
  });
  
  if (!topic) {
    topic = await prisma.topic.create({
      data: { name: topicName }
    });
  }

  return topic.id
}