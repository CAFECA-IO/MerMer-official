import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method} = req;
  const {kmId} = req.query;
  if(!kmId || Array.isArray(kmId)){
    return res.status(400).json({message: 'Invalid request'});
  }

  switch (method) {
    case 'GET':
        // Info (20240220 - Murky) 每次call api share + 1
        await prisma.km.update({
          where: {
            id: kmId,
          },
          data: {
            views: {
              increment: 1,
            },
          },
        });

      return res.status(200).json({
        message: 'success'
      });
    default:
      return res.status(405).json({message: 'Method Not Allowed'});
  }

}
  