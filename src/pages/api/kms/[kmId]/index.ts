import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/db";
import { changeMdToMdx, changeMdxToMd } from "../../../../lib/md_mdx_format_transfer";
import { isIKmForSave } from "../../../../interfaces/km";
import { parseForm } from "../../../../lib/parse_form_data";
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { File } from "formidable";
import mime from "mime-types";
import { merMerAdminConfig } from "../../../../constants/config";
// 要使用formidable要先關掉bodyParsor
export const config = {
  api: {
    bodyParser: false,
  },
};

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
          author:{
            select: {
              email: true
            }
          },
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
      km.mdFile = changeMdToMdx(km.mdFile);
      res.status(200).json(km);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the km.' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { fields, files } = await parseForm(req);
      if (!fields?.kmForSave) {
        return res.status(400).json({ error: 'Invalid request, can not get kmForSave' });
      }

      const kmForSave = JSON.parse(fields.kmForSave[0]);
      if (!isIKmForSave(kmForSave)) {
        return res.status(400).json({ error: 'Invalid request, format unmatch' });
      }


      const { title, selectedKmTopicName, description, tags, isNewImage,  mdFile, isPublished } = kmForSave;

      // mdFile 裡的 <img/> 改回 <img>
      const normalImgTagMdFile = changeMdxToMd(mdFile);

      // 如果有新傳的圖片就存好再回傳url
      let pictureUrl: string | undefined = undefined;
      if (isNewImage) {
        if (!files?.image || !files.image.length) {
          return res.status(400).json({ error: 'Invalid request, can not get image' });
        }
        const image:File = files.image[0];
        const buffer = await fs.readFile(image.filepath);
        const uuidFileName = uuidv4() + `${image?.mimetype ? '.' + mime.extension(image.mimetype) : ""}`;
        const saveFiledUrl = path.join(merMerAdminConfig.kmImageStoreInPublicUrl, uuidFileName)

        await fs.writeFile(path.join(process.cwd(), saveFiledUrl), buffer);

        pictureUrl =  path.join('/api', saveFiledUrl)
      }


      const km = await prisma.km.update({
        where: {
          id: kmId
        },
        data: {
          title,
          topic: {
            connect: {
              name: selectedKmTopicName
            }
          },
          categories: {
            set: tags
          },
          description,
          picture: pictureUrl,
          mdFile: normalImgTagMdFile,
          isPublished
        }
      });

      return res.status(200).json(km);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while updating the km.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.km.delete({
        where: {
          id: kmId
        }
      });
      return res.status(200).json({ message: 'Km deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while deleting the km.' });
    }
  }
  else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
