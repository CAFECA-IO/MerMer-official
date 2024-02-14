import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';
import { IKmTag } from '../../../interfaces/km';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const categories = await prisma.category.findMany();
      const modifiedCategories:IKmTag[] = categories.map((category) => ({
        ...category,
        __isNew__: false,
      }));

      return res.status(200).json(modifiedCategories);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
