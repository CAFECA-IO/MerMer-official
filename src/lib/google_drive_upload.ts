// Reference:
// https://stackoverflow.com/questions/72864657/hosting-pictures-with-react-and-google-drive
// https://github.com/googleapis/google-api-nodejs-client#readme

import { File } from 'formidable';
import { google } from 'googleapis';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

export default async function googleDriveUpload(file: File) {
  try {

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN
  });

  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });

  const folderID = process.env.GOOGLE_DRIVE_FOLDER_ID || null;
  const res = await drive.files.create({
    requestBody: {
      name: `${uuidv4()}.${file.newFilename.split('.')[1]}`,
      mimeType: file.mimetype,
      parents: folderID ? [folderID] : null,
    },
    media: {
      // mimeType: file.mimetype,
      body: fs.createReadStream(file.filepath)
    }
  });
// 设置文件为公开
const fileId = res.data.id;
if (!fileId) {
  throw new Error('fileId is null');
}
await drive.permissions.create({
  fileId: fileId,
  requestBody: {
    type: 'anyone',
    role: 'reader',
  },
});
  return `https://drive.google.com/thumbnail?sz=w1920&id=${res.data.id}`
  }catch(e){
    throw e;
  }
}
