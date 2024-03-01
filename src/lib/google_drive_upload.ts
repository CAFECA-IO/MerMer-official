// Reference:
// https://stackoverflow.com/questions/72864657/hosting-pictures-with-react-and-google-drive
// https://github.com/googleapis/google-api-nodejs-client#readme

import { File } from 'formidable';
import { googleAuth, googleStorage } from './google_setting';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import mime from 'mime-types';

export default async function googleDriveUpload(file: File) {

  try {
    const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;
    const fileName = `${uuidv4()}.${mime.extension(file.mimetype || 'application/octet-stream')}`;
    const storePath = `${fileName}`;
    const url = `https://storage.googleapis.com/${bucketName}/${storePath}`;
    const res = await googleStorage.objects.insert({
      bucket: bucketName,
      media: {
        body: fs.createReadStream(file.filepath), // 從本地文件系統讀取文件
      },
      auth: googleAuth,
      requestBody: {
        name: storePath, // 存儲在Bucket中的文件名
      },
    });

    if(res.status !== 200){
      throw new Error('Google Drive Upload Error');
    }
    const resForSetPublic = await googleStorage.objectAccessControls.insert({
      bucket: bucketName,
      object: storePath,
      requestBody: {
        entity: 'allUsers',
        role: 'READER',
      },
    });

    if(resForSetPublic.status !== 200){
      throw new Error('Google Drive Set Public Error');
    }
    return url;
  }catch(e){
    console.log(e);
    throw e;
  }
}
