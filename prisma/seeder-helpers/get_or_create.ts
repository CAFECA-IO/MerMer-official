import type { PrismaClient } from '@prisma/client';
export async function getOrCreateJobTitle(jobName: string, prisma: PrismaClient): Promise<number> {
  let jobTitle = await prisma.jobTitle.findFirst({
    where: { jobTitle: jobName}
  });
  
  if (!jobTitle) {
    jobTitle = await prisma.jobTitle.create({
      data: { jobTitle: jobName }
    });
  }

  return jobTitle.id
}

export async function getOrCreateCategory(name: string, prisma: PrismaClient): Promise<number> {
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

export async function getOrCreateTopic(topicName: string, prisma: PrismaClient): Promise<number> {
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