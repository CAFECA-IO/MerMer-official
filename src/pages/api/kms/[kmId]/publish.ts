import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { kmId } = req.query;

  // Info (20240216) Murky 這裡的檢查是為了確保kmId是一個string
  if (!kmId || Array.isArray(kmId)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  if (req.method === 'PUT') {
    try {
      const updatedKm = await prisma.km.update({
        where: {
          id: kmId,
        },
        data: {
          isPublished: true,
        },
      });

      if (!updatedKm) {
        return res.status(400).json({ error: 'Failed to publish KM' });
      }

      return res.status(200).json({
        kmId:updatedKm.id,
        isPublished:updatedKm.isPublished
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Service Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
