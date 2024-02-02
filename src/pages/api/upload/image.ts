import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Files, Fields, Options } from 'formidable';
import { merMerAdminConfig } from '../../../constants/config';
import path from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Info (20240202) Murky API 範例如下：
//要用 formData 來 Post 圖片
// 圖片要放在 'image', 圖片名稱要放在 'imageName', 存檔路徑放在 'imageSavedUrl'
// 存檔路徑如果是 /public 開頭，回傳路徑會去除 /public 方便以後引用

// 前端請用以下方法POST
// const formData = new FormData()
// formData.append('image', image)
// formData.append('imageName', image.name)
// formData.append('imageSavedUrl', merMerAdminConfig.kmImageStoreInPublicUrl)
// // send the file to your server and return
// // the URL of the uploaded image in the response
// const response = await fetch('/api/upload/image', {
//   method: 'POST',
//   body: formData
// })




// 要使用formidable要先關掉bodyParsor
export const config = {
  api: {
    bodyParser: false,
  },
};
const options: Partial<Options> = {
  encoding: 'utf-8',
  uploadDir: path.join(process.cwd(), merMerAdminConfig.formidableUploadUrl),
  keepExtensions: true,
  maxFieldsSize: 200 * 1024 * 1024, // (200mb),
  maxFields: 1000,
  multiples: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filter: function ({name, originalFilename, mimetype}) {
    // keep only images
    return !!(mimetype && mimetype.includes("image"));
  }
}
// Helper function to wrap formidable's parse method in a promise
const parseForm = (req: NextApiRequest): Promise<{ fields: Fields, files: Files<string>}> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm(options);
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Await the parseForm promise to get fields and files
      const { fields, files } = await parseForm(req);

      const image = files.image;
      if (!image || !image.length) {
        return res.status(400).json({ error: "No image Uploaded, data should have key 'image'", url: null });
      }

      const imageName = fields.imageName;
      if (!imageName || !imageName.length) {
        return res.status(400).json({ error: "Image name is missing, image name should have key 'imageName'", url: null });
      }

      const imageSavesUrl = fields.imageSavedUrl;
      if (!imageSavesUrl || !imageSavesUrl.length) {
        return res.status(400).json({ error: "imageSavesUrl is missing, imageSavesUrl should have key 'imageSavesUrl'", url: null });
      }



      const buffer = await fs.readFile(image[0].filepath);
      const uuidFileName = uuidv4() + `_${imageName[0]}`;
      const saveFiledUrl = path.join(imageSavesUrl[0], uuidFileName)

      await fs.writeFile(path.join(process.cwd(), saveFiledUrl), buffer);

      // Use res.status().json() to send the response
      const isSavedUrlInPublic = /^\/?public/.test(imageSavesUrl[0])

      const returnUrl = isSavedUrlInPublic ? saveFiledUrl.replace(/^\/public/, "") : saveFiledUrl

      return res.status(200).json({ url:returnUrl });
    } catch (error) {
      // Handle errors, including any errors thrown by fs.readFile or fs.writeFile
      return res.status(500).json({ error: 'error', url: null });
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ error: "Method Not Allowed", url: null });
  }
}