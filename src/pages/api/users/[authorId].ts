
import type { IKnowledgeManagement } from '../../../interfaces/km_article'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db';
// Till (20240317) Murky, 暫留，若有get all kms 的content時啟用
// import { marked } from 'marked';
import { IAuthor } from '../../../interfaces/author_data';

function isLanguege(languege: string): languege is 'en'| 'cn'|'tw' {
  return typeof languege === 'string' && ['en', 'cn', 'tw'].includes(languege);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method} = req;
  const authorId = req.query.authorId;
  if(!authorId || typeof authorId !== 'string'){
    return res.status(400).json({message: 'Invalid authorId'});
  }

  switch (method) {
    case 'GET':
      const language = req.query.language || 'tw';
      if (typeof language !== 'string' || !isLanguege(language)) {
        return res.status(400).json({message: 'Invalid languege'});
      }

      const kmsFromDb = await prisma.km.findMany({
        where:{
          author: {
            id: authorId
          },
          isPublished: true
        },
        include:{
          categories: true,
          topic: true,
          author: {
            include:{
              enUserData: {
                include: {
                  jobTitle: true,
                }
              },
              cnUserData: {
                include: {
                  jobTitle: true,
                }
              },
              twUserData:  {
                include: {
                  jobTitle: true,
                }
              },
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if(!kmsFromDb){
        return res.status(404).json({message: 'Not Found'});
      }

      const kmsForReturn: IKnowledgeManagement[] = kmsFromDb.map((km) => {
        // const content = marked(km.mdFile);
        const categories = km.categories.map((category) => category.label);
        const authorLanguageData = km.author[`${language}UserData`]
        const author: IAuthor = {
          id: km.author.id,
          name: authorLanguageData?.name || km.author.id,
          jobTitle: authorLanguageData?.jobTitle?.jobTitle || '',
          intro: authorLanguageData?.intro || '',
          avatar: km.author.avatar || '/icons/user.svg',
        }
        return {
          id: km.id,
          date: km.createdAt.getTime(),
          title: km.title,
          description: km.description || "",
          content: "",
          category: categories,
          picture: km.picture || '/api/public/km/03.png',
          author: author,
          views: km.views,
          shares: km.shares,
        }
      })

      return res.status(200).json(kmsForReturn);
    default:
      return res.status(405).json({message: 'Method Not Allowed'});
  }

}
  