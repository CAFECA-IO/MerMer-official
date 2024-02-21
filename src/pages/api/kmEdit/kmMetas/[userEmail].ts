import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/db';
import { IAllKmMeta } from '../../../../interfaces/km';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail } = req.query;
  if (!userEmail || typeof userEmail !== 'string') {
    return res.status(400).json({ error: 'Bad Request' });
  }
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
          createdAt: true,
          updatedAt: true,
          views: true,
          shares: true,
        },
        where: {
          author: {
            email: userEmail,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });


      const response: IAllKmMeta = {
        drafts: {
          publishStatus: 'Drafts',
          kmMetas: allKms.filter(km => !km.isPublished),
        },
        published: {
          publishStatus: 'Published',
          kmMetas: allKms.filter(km => km.isPublished),
        },
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

