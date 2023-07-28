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

// ToDo: (20230720 - Julian) 另外拔出來
export const mermerAuthors: IAuthor[] = [
  {
    id: 'julian',
    name: 'AUTHOR.JULIAN_NAME',
    jobTitle: 'AUTHOR.JULIAN_JOBTITLE',
    intro: 'AUTHOR.JULIAN_INTRO',
    avatar: '/profiles/profile_julian.png',
  },
];
