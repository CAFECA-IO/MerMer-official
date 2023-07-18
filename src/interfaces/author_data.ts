export interface IAuthor {
  name: string;
  intro: string;
  avatar: string;
}

export const notFoundAuthor = {
  name: 'NaN',
  intro: 'NaN',
  avatar: '/icons/user.svg',
};

export const dummyAuthors: IAuthor[] = [
  {
    name: 'Jane Doe',
    intro: 'Senior Designer',
    avatar: '/icons/user.svg',
  },
  {
    name: 'Wendy May',
    intro: 'Frontend Developer',
    avatar: '/icons/user.svg',
  },
  {
    name: 'John Doe',
    intro: 'Backend Developer',
    avatar: '/icons/user.svg',
  },
];
