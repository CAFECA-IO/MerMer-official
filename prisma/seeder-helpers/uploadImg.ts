import { UTApi } from "uploadthing/server"
import fs from 'fs'
import { Blob, File } from "buffer"
import path from "path"
import mime from 'mime-types'


// Edge / Node < 20 friendly File interface
interface FileEsque extends Blob { // 這個是官網給的type, 其實就是file type
  name: string
}

const utapi = new UTApi()
export default async function processMd(mdFile:string):Promise<string> {
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
      cloudUrl = await uploadFile(fullPath)
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

export async function uploadFile(filePath: string): Promise<string|undefined>{
  // 一次上傳一筆
  // 這是uploadthings的apu

  // file是File type 要 array [blob] + 名稱
  const files = getFileData(filePath)

  // Info: (20240221 - Murky) console log  file been upload
  // eslint-disable-next-line no-console
  console.log(filePath)
  const response = await utapi.uploadFiles(files)

  return response.data?.url
}




function getFileData(filePath: string): FileEsque{
  const buffer = fs.readFileSync(filePath)
  const name = path.basename(filePath)
  const type = mime.contentType(name) || 'application/octet-stream' // 'application/octet-stream' 是未知值
  // blob => [buffer] + type
  const blob = new Blob([buffer], { type: type })
  // File [blob] + name
  const file = new File([blob], name)

  return file
}
