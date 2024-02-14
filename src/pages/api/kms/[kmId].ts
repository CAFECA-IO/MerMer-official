import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/db";
import { changeImgTagsToSelfClosing } from "../../../lib/img_to_imgJSX";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { kmId } = req.query;
  if (!kmId || Array.isArray(kmId)) {
    return res.status(400).json({ error: 'Invalid request' });
  }


  if (req.method === 'GET') {
    try {
      const km = await prisma.km.findUnique({
        where: {
          id: kmId
        },
        include: {
          categories: {
            select: {
              id: true,
              label: true,
              value: true
            }
          },
          topic: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      if (!km) {
        return res.status(404).json({ error: 'Km not foun' });
      }

      // 先把所有的 <img> tag 改成 <img/>，儲存時再改回來
      km.mdFile = changeImgTagsToSelfClosing(km.mdFile);
      res.status(200).json(km);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the km.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
