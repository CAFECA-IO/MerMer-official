import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
// import { v4 as uuidv4 } from 'uuid';
import { parseForm } from '../../../lib/parse_form_data';
import { utapi } from '../../../lib/uploadthings_server';
import formidable from 'formidable';
import googleDriveUpload from '../../../lib/google_drive_upload';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Await the parseForm promise to get fields and files
      const { fields, files } = await parseForm(req);

      if (!files.image || !files.image.length) {
        return res.status(400).json({ error: "No image Uploaded, data should have key 'image'", url: null });
      }

      const imageName = fields.imageName;
      if (!imageName || !imageName.length) {
        return res.status(400).json({ error: "Image name is missing, image name should have key 'imageName'", url: null });
      }

      // const imageSavesUrl = fields.imageSavedUrl;
      // if (!imageSavesUrl || !imageSavesUrl.length) {
      //   return res.status(400).json({ error: "imageSavesUrl is missing, imageSavesUrl should have key 'imageSavesUrl'", url: null });
      // }


      const imageTemp:formidable.File = files.image[0];
      const imageTempName = imageName[0];

      const url = await googleDriveUpload(imageTemp);
      // const buffer = await fs.readFile(imageTemp.filepath);

      // const imageForUpload = new File([buffer],`${uuidv4()}.${imageTempName.split('.')[1]}`, { type: imageTemp.mimetype || "" });

      // const response = await utapi.uploadFiles(imageForUpload);
      // if (response.error) {
      //   return res.status(500).json({ error: response.error.message, url: null });
      // }

      console.log('url', url);
      return res.status(200).json({ url });
    } catch (error) {
      // Handle errors, including any errors thrown by fs.readFile or fs.writeFile
      return res.status(500).json({ error: 'error', url: null });
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ error: "Method Not Allowed", url: null });
  }
}