import { google } from 'googleapis';

const scope = 'https://www.googleapis.com/auth/devstorage.read_write';

export const googleAuth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY || '{}'),
  // keyFilename: './mermer-official-415806-69d7b2d878ee.json',
  scopes: scope,
});

export const googleStorage = google.storage({
  version: 'v1',
  auth: googleAuth,
});