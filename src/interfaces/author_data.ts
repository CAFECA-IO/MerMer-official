export interface IAuthor {
  id: string;
  name: string;
  jobTitle: string;
  intro: string;
  avatar: string;
}

export const notFoundAuthor: IAuthor = {
  id: 'none',
  name: 'NaN',
  jobTitle: 'NaN',
  intro: 'NaN',
  avatar: '/icons/user.svg',
};

export const julianData: IAuthor = {
  id: 'julian',
  name: 'Julian Hsu',
  jobTitle: 'Frontend Developer',
  intro:
    'Give me a cup of Milk Cap Tea and I can lift the whole world. Must be full sugar and Cream Cheese flavor. Preferably topped with a Strawberry Mochi.',
  avatar: '/profiles/profile_julian.png',
};
