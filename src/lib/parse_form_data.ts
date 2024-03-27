
// parse form and return fields and files by async function

import { NextApiRequest } from "next";
import { IncomingForm, Files, Fields, Options } from 'formidable';
import path from "path";
import { merMerAdminConfig } from "../constants/config";
import fs from 'fs';
// Helper function to wrap formidable's parse method in a promise
export const parseForm = (req: NextApiRequest): Promise<{ fields: Fields, files: Files<string>}> => {
  const options: Partial<Options> = {
    encoding: 'utf-8',
    uploadDir: process.env.VERCEL === '1' ? "/tmp" : path.join(process.cwd(), merMerAdminConfig.formidableUploadUrl),
    keepExtensions: true,
    maxFieldsSize: 200 * 1024 * 1024, // (200mb),
    maxFields: 1000,
    multiples: false,

    // Till (20240316 - Murky) 預留給以後開發使用
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filter: function ({name, originalFilename, mimetype}) {
      // Info (20240316 - Murky) keep only images type
      return !!(mimetype && mimetype.includes("image"));
    }
  }

  //Info (20240327) - Murky, Check if /tmp folder exists, if not create it
  if (!fs.existsSync(options.uploadDir || "/tmp")) {
    fs.mkdirSync(options.uploadDir || "/tmp");
  }

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