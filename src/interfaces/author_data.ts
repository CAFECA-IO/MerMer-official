export interface IAuthor {
  name: string;
  jobTitle: string;
  intro: string;
  avatar: string;
}

export const notFoundAuthor: IAuthor = {
  name: 'NaN',
  jobTitle: 'NaN',
  intro: 'NaN',
  avatar: '/icons/user.svg',
};

export const dummyAuthors: IAuthor[] = [
  {
    name: 'Jane Doe',
    jobTitle: 'Senior Designer',
    intro: 'I am a designer, I love to design',
    avatar: '/icons/user.svg',
  },
  {
    name: 'Wendy May',
    jobTitle: 'Frontend Developer',
    intro: 'Life is short, use React',
    avatar: '/icons/user.svg',
  },
  {
    name: 'John Doe',
    jobTitle: 'Backend Developer',
    intro: "If you can't fix it, it's not broken",
    avatar: '/icons/user.svg',
  },
];
