import {IAuthor, notFoundAuthor} from './author_data';

export interface IKnowledgeManagement {
  id: string;
  date: number;
  title: string;
  description: string;
  content: string;
  category: string[];
  picture: string;
  author: IAuthor;
}

export const notFoundKM = {
  id: 'km000000',
  date: 0,
  title: 'Not Found',
  description: '',
  content: '',
  category: '',
  picture: '',
  author: notFoundAuthor,
};
