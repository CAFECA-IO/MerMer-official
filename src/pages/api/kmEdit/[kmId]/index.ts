import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../../lib/db';
import {changeMdToMdx, changeMdxToMd} from '../../../../lib/md_mdx_format_transfer';
import {isIKmForSave} from '../../../../interfaces/km';
import {parseForm} from '../../../../lib/parse_form_data';
import formidable from 'formidable';
import googleDriveUpload from '../../../../lib/google_drive_upload';
// 要使用formidable要先關掉bodyParsor
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {kmId} = req.query;
  if (!kmId || Array.isArray(kmId)) {
    return res.status(400).json({error: 'Invalid request'});
  }

  if (req.method === 'GET') {
    try {
      const km = await prisma.km.findUnique({
        where: {
          id: kmId,
        },
        include: {
          author: {
            select: {
              email: true,
            },
          },
          categories: {
            select: {
              id: true,
              label: true,
              value: true,
            },
          },
          topic: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!km) {
        return res.status(404).json({error: 'Km not found'});
      }

      // 先把所有的 <img> tag 改成 <img/>，儲存時再改回來
      km.mdFile = changeMdToMdx(km.mdFile);
      res.status(200).json(km);
    } catch (error) {
      res.status(500).json({error: 'An error occurred while fetching the km.'});
    }
  } else if (req.method === 'PUT') {
    try {
      const {fields, files} = await parseForm(req);
      if (!fields?.kmForSave) {
        return res.status(400).json({error: 'Invalid request, can not get kmForSave'});
      }

      const kmForSave = JSON.parse(fields.kmForSave[0]);
      if (!isIKmForSave(kmForSave)) {
        return res.status(400).json({error: 'Invalid request, format unmatch'});
      }

      const {title, selectedKmTopicName, description, tags, isNewImage, mdFile, isPublished} =
        kmForSave;

      //Info (20240327) - Murky,  mdFile 裡的 <img/> 改回 <img>
      const normalImgTagMdFile = changeMdxToMd(mdFile);

      //Info (20240327) - Murky,  如果有新傳的圖片就存好再回傳url
      let pictureUrl: string | undefined = undefined;
      if (isNewImage) {
        if (!files?.image || !files.image.length) {
          return res.status(400).json({error: 'Invalid request, can not get image'});
        }
        const imageTemp: formidable.File = files.image[0];
        // const buffer = await fs.readFile(imageTemp.filepath);

        // const imageForUpload = new File([buffer],`${uuidv4()}.${imageTemp.newFilename.split('.')[1]}`, { type: imageTemp.mimetype || "" });
        // const response = await utapi.uploadFiles(imageForUpload);
        // if (response.error) {
        //   return res.status(500).json({ error: response.error.message, url: null });
        // }
        // pictureUrl =  response.data.url

        pictureUrl = await googleDriveUpload(imageTemp);
      }

      const km = await prisma.km.update({
        where: {
          id: kmId,
        },
        data: {
          title,
          topic: {
            connect: {
              name: selectedKmTopicName,
            },
          },
          categories: {
            set: tags,
          },
          description,
          picture: pictureUrl,
          mdFile: normalImgTagMdFile,
          isPublished,
        },
      });

      return res.status(200).json(km);
      // Info: (20240220 - Murky) 這裡需要用any 才可以抓到error.message
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(500).json({error: error.message});
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.km.delete({
        where: {
          id: kmId,
        },
      });
      return res.status(200).json({message: 'Km deleted successfully'});
    } catch (error) {
      return res.status(500).json({error: 'An error occurred while deleting the km.'});
    }
  } else {
    return res.status(405).json({error: 'Method Not Allowed'});
  }
}
