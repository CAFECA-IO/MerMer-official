import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';
import { IAllKmMeta } from '../../../interfaces/km';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allKms = await prisma.km.findMany({
        select: {
          id: true,
          title: true,
          isPublished: true,
          authorId: true,
          picture: true,
          description: true,
          categories: true,
          topic : true,
          mdFile: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: {
          createdAt: 'desc',
        },
      });



      return res.status(200).json(allKms);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      // Info (20240216 - Murky)
      // 取得今天最新的kmId
      const kmToday = await prisma.km.findFirst({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)), // 今天 00:00:00之後
          },
        },
        select: {
          id: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Info (20240216 - Murky)
      // 如果有今天的km，就取出最後一個數字，+1, 沒有就用1
      // 然後把今天的日期加上去，再加上三位數字，不足的補0
      const kmIdxNumber = kmToday ? parseInt(kmToday.id.slice(kmToday.id.length - 3, kmToday.id.length)) + 1 : 1;
      const kmId = `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${kmIdxNumber.toString().padStart(3, '0')}`;

      const newKm = await prisma.km.create({
        data: {
          id: kmId,
          title: `New KM-${kmId}`,
          author: {
            connect: {
              email: 'murky0830@gmail.com',
            },
          },
          isPublished: false,
          description: 'You need to edit this description',
          mdFile: `# ${kmId}`,
          picture: '/km/react-tips-banner.jpg',
          topic: {
            connect: {
              name: 'general',
            },
          },
        },
      });

      if (!newKm) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      return res.status(200).json({ kmId: newKm.id });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
