// Reference:
// https://stackoverflow.com/questions/72864657/hosting-pictures-with-react-and-google-drive
// https://github.com/googleapis/google-api-nodejs-client#readme

import { File } from 'formidable';
import { uploadGoogleFile } from './google_setting';
import {v4 as uuidv4} from 'uuid';
import mime from 'mime-types';

export default async function googleDriveUpload(file: File) {

  try {
    const fileName = `${uuidv4()}.${mime.extension(file.mimetype || 'application/octet-stream')}`;
    const storePath = `km/${fileName}`;

    const uploadToGoogle = uploadGoogleFile(file.filepath, storePath, 0);
    const url = await uploadToGoogle();
    return url;
  }catch(e){
    throw e;
  }
}
