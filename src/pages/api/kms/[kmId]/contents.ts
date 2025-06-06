import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../../lib/db';
import {marked} from 'marked';
import {ITableOfContentsItem} from '../../../../interfaces/table_of_contents';
import {IHTMLHeadTag} from '../../../../constants/html_tag';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {kmId} = req.query;

  if (!kmId || Array.isArray(kmId)) {
    return res.status(400).json({error: 'Invalid request'});
  }

  if (req.method === 'GET') {
    try {
      const km = await prisma.km.findFirst({
        include: {
          categories: true,
          topic: true,
          author: {
            include: {
              enUserData: {
                include: {
                  jobTitle: true,
                },
              },
              cnUserData: {
                include: {
                  jobTitle: true,
                },
              },
              twUserData: {
                include: {
                  jobTitle: true,
                },
              },
            },
          },
        },
        where: {
          id: kmId,
          isPublished: true,
        },
      });

      // Info: (20250606 - Julian) 如果沒有找到 km，則返回 404
      if (!km) {
        return res.status(404).json({error: 'Km not found'});
      }

      const kmContent = marked(km.mdFile);

      // Info: (20250606 - Julian) 提取 h1, h2, h3, h4 標題作為目錄
      const contents = kmContent.match(/<h([1-4])[^>]*>(.*?)<\/h[1-4]>/g) || [];

      // Info: (20250606 - Julian) 生成目錄結構
      const tableOfContents: ITableOfContentsItem[] = contents.map((item, index) => {
        // Info: (20250606 - Julian) 提取 id 和標題
        const id = item.match(/id="([^"]+)"/)?.[1] || '';
        const title = item.replace(/<.*?>/g, '').trim();

        // Info: (20250606 - Julian) 根據 html 標籤提取層級
        const htmlTag = item.match(/<h([1-4])/);
        const level = htmlTag ? (`h${htmlTag[1]}` as IHTMLHeadTag) : 'h1';

        return {
          id,
          title,
          level,
          index,
        };
      });

      return res.status(200).json(tableOfContents);
    } catch (error) {
      res.status(500).json({error: 'An error occurred while fetching the km.'});
    }
  } else {
    return res.status(405).json({error: 'Method Not Allowed'});
  }
}
