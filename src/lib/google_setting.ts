// Ref: https://cloud.google.com/storage/docs/uploading-objects#storage-upload-object-client-libraries
import { Storage } from "@google-cloud/storage";

export const googleStorage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY || '{}'),
});

export const googleBucket = googleStorage.bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME || '');

export function uploadGoogleFile(filePath: string, destFileName: string, generationMatchPrecondition: number) {
  const options = {
    destination: destFileName,
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
  };
  const url = `https://storage.googleapis.com/${process.env.GOOGLE_STORAGE_BUCKET_NAME ?  process.env.GOOGLE_STORAGE_BUCKET_NAME + '/': ''}${destFileName}`;
  return async function uploadFile() {
    await googleBucket.upload(filePath, options);
    await googleBucket.file(destFileName).makePublic()
    return url;
  }
}
