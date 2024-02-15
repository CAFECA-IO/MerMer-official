
// parse form and return fields and files by async function

import { NextApiRequest } from "next";
import { IncomingForm, Files, Fields, Options } from 'formidable';
import path from "path";
import { merMerAdminConfig } from "../constants/config";
// Helper function to wrap formidable's parse method in a promise
export const parseForm = (req: NextApiRequest): Promise<{ fields: Fields, files: Files<string>}> => {
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