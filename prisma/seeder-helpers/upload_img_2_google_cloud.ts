import fs from 'fs'
import path from "path"
import { uploadGoogleFile } from '../../src/lib/google_setting';


export default async function processMdByGoogleCloud(mdFile:string):Promise<string> {
  // 讀mdx擋在的path
  const updatedContent = await replaceImagePaths(mdFile)
  
  // write回文件或保存成新文件
  // 以下兩個預留以後要製造新mdx儲存時再用，現在先直接回傳
  // fs.writeFileSync(`${mdxPath}.new`, updatedContent, 'utf8')
  // 或者： fs.writeFileSync(mdxPath, updatedContent, 'utf8')
  return updatedContent
}

// MDX文件圖片相對路徑
const imageRegex = /(\/km\/[^'"\s)]+)/g
// 圖片相對路徑替換成絕對路徑，然後上傳updatethings之後
async function replaceImagePaths(mdFile:string):Promise<string>{


  const matches = mdFile.matchAll(imageRegex)
  
  for (const match of matches) {
    const localPath = match[1] //0是整個路徑
    const fullPath = path.join(process.cwd(), '/public', localPath);
    let cloudUrl: string | undefined
    try{
      cloudUrl = await uploadFileByGoogle(fullPath)
    } catch (e){
      // Info: (20240221 - Murky) console log skip path
      // eslint-disable-next-line no-console
      console.log('Skip uploading file', fullPath)
      continue
    }

    // 替换本地路径成cloudURL
    // 沒有成功就跳過
    if (!cloudUrl){
      continue
    }
    mdFile = mdFile.replace(localPath, cloudUrl)
  }
  
  return mdFile
}

export async function uploadFileByGoogle(filePath: string): Promise<string|undefined>{
  try {

    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    const name = path.basename(filePath)
    const storePath = `km/${name}`

    const uploadToGoogle = uploadGoogleFile(filePath, storePath, 0)
    const url = await uploadToGoogle();

    return url;

  }catch(e){
    throw e; 
  }
}
