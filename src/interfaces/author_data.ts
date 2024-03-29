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
  {
    id: 'jodie',
    name: 'AUTHOR.JODIE_NAME',
    jobTitle: 'AUTHOR.JODIE_JOBTITLE',
    intro: 'AUTHOR.JODIE_INTRO',
    avatar: '/profiles/profile_jodie.png',
  },
  {
    id: 'emily',
    name: 'AUTHOR.EMILY_NAME',
    jobTitle: 'AUTHOR.EMILY_JOBTITLE',
    intro: 'AUTHOR.EMILY_INTRO',
    avatar: '/profiles/profile_emily.png',
  },
  {
    id: 'shirley',
    name: 'AUTHOR.SHIRLEY_NAME',
    jobTitle: 'AUTHOR.SHIRLEY_JOBTITLE',
    intro: 'AUTHOR.SHIRLEY_INTRO',
    avatar: '/profiles/profile_shirley.png',
  },
  {
    id: 'steve',
    name: 'AUTHOR.STEVE_NAME',
    jobTitle: 'AUTHOR.STEVE_JOBTITLE',
    intro: 'AUTHOR.STEVE_INTRO',
    avatar: '/profiles/profile_steve.jpg',
  },
  {
    id: 'yang',
    name: 'AUTHOR.YANG_NAME',
    jobTitle: 'AUTHOR.YANG_JOBTITLE',
    intro: 'AUTHOR.YANG_INTRO',
    avatar: '/profiles/profile_yang.jpg',
  },
  {
    id: 'liz',
    name: 'AUTHOR.LIZ_NAME',
    jobTitle: 'AUTHOR.LIZ_JOBTITLE',
    intro: 'AUTHOR.LIZ_INTRO',
    avatar: '/profiles/profile_liz.png',
  },
  {
    id: 'murky',
    name: 'AUTHOR.MURKY_NAME',
    jobTitle: 'AUTHOR.MURKY_JOBTITLE',
    intro: 'AUTHOR.MURKY_INTRO',
    avatar: '/profiles/profile_murky.png',
  },
];
