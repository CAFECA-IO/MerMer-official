import {IAuthor, dummyAuthors, notFoundAuthor} from './author_data';

export interface IKnowledgeManagement {
  id: string;
  date: number;
  title: string;
  description: string;
  content: string;
  cagetory: string;
  picture: string;
  author: IAuthor;
}

export const notFoundKM = {
  id: 'km000000',
  date: 0,
  title: 'Not Found',
  description: '',
  content: '',
  cagetory: '',
  picture: '',
  author: notFoundAuthor,
};

export const dummyKMList: IKnowledgeManagement[] = [
  {
    id: 'km000001',
    date: 1683870086000,
    title: 'Article Title1',
    description: 'Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.',
    content:
      'Sed enim ex, convallis at lectus ac, condimentum tincidunt massa. Suspendisse viverra vulputate velit, a pulvinar quam luctus et. Maecenas a quam sed metus commodo posuere. Sed pharetra quam vitae sodales dapibus. Curabitur vitae mauris vel urna consectetur cursus. In accumsan sed ex quis vulputate. Mauris sed justo nec eros porta finibus id sit amet augue.',
    cagetory: 'Category',
    picture: '/km/01.png',
    author: dummyAuthors[0],
  },
  {
    id: 'km000002',
    title: 'Article Title2',
    date: 16938986000000,
    description: 'Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.',
    content:
      'Quisque elit enim, iaculis a interdum sit amet, maximus non odio. Donec in nibh urna. In hac habitasse platea dictumst. Maecenas faucibus lectus ut aliquet congue. Proin interdum, lorem sit amet interdum volutpat, lorem turpis tempor velit, a egestas mi neque vitae lectus. Pellentesque et quam aliquet, mollis lorem vel, sollicitudin justo. Morbi tincidunt ipsum et erat volutpat tempor ac vel arcu. Morbi consequat turpis ut neque ultrices venenatis. Pellentesque lacinia diam quis ultrices accumsan. Nam neque mi, auctor nec sem eget, porta tempus purus. Donec fermentum ultrices vulputate. Maecenas ullamcorper vehicula faucibus.',
    cagetory: 'Category',
    picture: '/km/02.png',
    author: dummyAuthors[1],
  },
  {
    id: 'km000003',
    date: 1687892451000,
    title: 'Article Title3',
    description: 'Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.',
    content:
      'Vestibulum vitae ante neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam in mollis arcu, et fermentum lacus. Curabitur non posuere eros, vel pellentesque enim. Quisque fermentum purus eros, sed lacinia sem elementum sit amet. Nunc vitae vulputate arcu, ac lacinia nulla. Quisque elementum est velit, placerat iaculis urna finibus nec. Aenean euismod felis est, at pellentesque nulla semper ac. Quisque accumsan finibus sollicitudin. Sed iaculis libero nec ante pellentesque convallis et et nunc. Fusce euismod lobortis ultrices. Integer suscipit vulputate elit, id vestibulum nisi auctor ac. Integer eget velit nibh.',
    cagetory: 'Category',
    picture: '/km/03.png',
    author: dummyAuthors[2],
  },
];
