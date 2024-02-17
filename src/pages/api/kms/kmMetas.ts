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
          createdAt: true,
          updatedAt: true
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

