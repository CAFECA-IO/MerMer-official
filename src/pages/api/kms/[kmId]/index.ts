import type { IKnowledgeManagement } from '../../../../interfaces/km_article'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db';
import { IAuthor } from '../../../../interfaces/author_data';
import { marked } from 'marked';

function isLanguege(languege: string): languege is 'en'| 'cn'|'tw' {
  return typeof languege === 'string' && ['en', 'cn', 'tw'].includes(languege);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method} = req;
  const {kmId} = req.query;
  if(!kmId || Array.isArray(kmId)){
    return res.status(400).json({message: 'Invalid request'});
  }

  switch (method) {
    case 'GET':
      const language = req.query.language || 'tw';
      if (typeof language !== 'string' || !isLanguege(language)) {
        return res.status(400).json({message: 'Invalid language'});
      }

      const km = await prisma.km.findFirst({
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
        where:{
          id: kmId,
          isPublished: true
        }
      });

      if(!km){
        return res.status(404).json({message: 'Not Found'});
      }

      const content = marked(km.mdFile);
      const categories = km.categories.map((category) => category.label);
      const authorLanguageData = km.author[`${language}UserData`]
      const author: IAuthor = {
        id: km.author.id,
        name: authorLanguageData?.name || km.author.id,
        jobTitle: authorLanguageData?.jobTitle?.jobTitle || '',
        intro: authorLanguageData?.intro || '',
        avatar: km.author.avatar || '/icons/user.svg',
      }
      const kmForReturn: IKnowledgeManagement = {

          id: km.id,
          date: km.createdAt.getTime(),
          title: km.title,
          description: km.description || "",
          content: content,
          category: categories,
          picture: km.picture || '/api/public/km/03.png',
          author: author,
        }

      return res.status(200).json(kmForReturn);
    default:
      return res.status(405).json({message: 'Method Not Allowed'});
  }

}
  