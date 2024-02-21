import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function getAllTopics(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const topics = await prisma.topic.findMany();
    res.status(200).json(topics);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
