// Ref: https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid"

export default async function handler(req: NextRequest) {
  console.log('aaaaaaaaaaaaaaaaaaaaa')
  if (req.method === 'POST') {
    const result = {
      url: 'FailToUpload'
    }
    // ref https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations
    // Info (20240201) Murky 前端需要使用 const fd = new Formdata() 的方法傳資料
    // fd 要取名叫做image fd.append('image', yourImg)
    const formData = await req.formData();
    const file = formData.get('image') as Blob | null;
    const fileName = formData.get('imageName');

    if(!file || ! fileName) {
      return NextResponse.json(result);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uuidFileName = uuidv4() + `_${fileName.toString()}`;
    const publicUrl = `/temp/${uuidFileName}`;
    try {
      await writeFile(
        path.join(process.cwd(), `public${publicUrl}` ),
        buffer
      );

      result.url = publicUrl;
      return result;
    } catch (error) {
      return result;
    }
  }
}