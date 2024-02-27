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
    ignoreDefaultVisibility:true,
    includePermissionsForView: 'published',
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
  //`return `https://drive.google.com/file/d/${res.data.id}/view`
  return `https://lh3.google.com/u/0/d/${res.data.id}`
  // return `https://drive.google.com/file/d/${res.data.id}/preview`
  // return `https://drive.google.com/uc?id=${res.data.id}`
  }catch(e){
    console.log('error',e)
    throw e;
  }
}
