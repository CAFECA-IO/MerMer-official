export const KM_PER_PAGE = 8;
export const KM_DESCRIPTION_LIMIT = 100;

export const KM_FOLDER = 'src/km';

export const SERVICE_TERM_TITLE = 'ServiceTerm';
export const DOMAIN = 'https://mermer.com.tw';
export const API_URL = 'https://mermer.com.tw'; //'http://localhost:80';
export const API_VERSION = 'v1';
export const TERM_OF_SERVICE = DOMAIN + '{hash}';
export const PRIVATE_POLICY = DOMAIN + '{hash}';
export const DeWT_VALIDITY_PERIOD = 60 * 60; // seconds

export const offerContent = [
  {
    title: 'HOME_PAGE.WHAT_WE_OFFER_BLOCK_1_TITLE',
    description: 'HOME_PAGE.WHAT_WE_OFFER_BLOCK_1_DESCRIPTION',
    image: '/elements/jodie_young_consultant.png',
  },
  {
    title: 'HOME_PAGE.WHAT_WE_OFFER_BLOCK_2_TITLE',
    description: 'HOME_PAGE.WHAT_WE_OFFER_BLOCK_2_DESCRIPTION',
    image: '/elements/jodie_decentralized_identity.png',
  },
  {
    title: 'HOME_PAGE.WHAT_WE_OFFER_BLOCK_3_TITLE',
    description: 'HOME_PAGE.WHAT_WE_OFFER_BLOCK_3_DESCRIPTION',
    image: '/elements/jodie_cute_robot.png',
  },
];

export const whyMermerContent = [
  {
    title: 'HOME_PAGE.WHY_US_BLOCK_1_TITLE',
    description: '250+',
    image: '/icons/smiley.svg',
  },
  {
    title: 'HOME_PAGE.WHY_US_BLOCK_2_TITLE',
    description: '14+',
    image: '/icons/files.svg',
  },
  {
    title: 'HOME_PAGE.WHY_US_BLOCK_3_TITLE',
    description: '6+',
    image: '/icons/medal.svg',
  },
  {
    title: 'HOME_PAGE.WHY_US_BLOCK_4_TITLE',
    description: '7+',
    image: '/icons/target.svg',
  },
];

export const partnersContent = [
  {
    name: 'TideBit',
    image: '/logos/tidebit_g.svg',
    hover: '/logos/tidebit.svg',
    link: 'https://tidebit-defi.com',
  },
  {
    name: 'BAIFAAA',
    image: '/logos/baifaaa_g.svg',
    hover: '/logos/baifaaa.svg',
    link: 'https://baifa.io',
  },
  {
    name: 'iSunCloud',
    image: '/logos/isuncloud_g.svg',
    hover: '/logos/isuncloud.svg',
    link: 'https://isuncloud.com',
  },
  {
    name: 'CAFECA',
    image: '/logos/cafeca_g.svg',
    hover: '/logos/cafeca.svg',
    link: 'https://cafeca.io',
  },
];

export const mermerAddressInMap =
  'https://www.google.com/maps/place/105%E5%8F%B0%E5%8C%97%E5%B8%82%E6%9D%BE%E5%B1%B1%E5%8D%80%E6%B0%91%E7%94%9F%E6%9D%B1%E8%B7%AF%E4%B8%89%E6%AE%B5156%E8%99%9F/@25.0573596,121.5455644,17z/data=!4m16!1m9!3m8!1s0x3442abe5fa651b97:0x102228e5b00fa9d3!2zMTA15Y-w5YyX5biC5p2-5bGx5Y2A5rCR55Sf5p2x6Lev5LiJ5q61MTU26Jmf!3b1!8m2!3d25.0573596!4d121.5477531!10e5!16s%2Fg%2F11j5999y35!3m5!1s0x3442abe5fa651b97:0x102228e5b00fa9d3!8m2!3d25.0573596!4d121.5477531!16s%2Fg%2F11j5999y35?entry=ttu';

export const mermerPhone = process.env.REACT_APP_MERMER_PHONE;
export const mermerEmail = process.env.REACT_APP_MERMER_EMAIL;
export const mermerCopyright = process.env.REACT_APP_MERMER_COPYRIGHT;

export const githubLink = process.env.REACT_APP_GITHUB_LINK;

// Login KM Editor(MerMer Admin) related
export const merMerAdminConfig = {
  redirectUrlIfLoginSuccess: '/admin/browse',
  redirectUrlIfLoginFail: '/admin/login',
  postloginVerifyUrl: '/api/auth/login',
  dashboardPageUrl: '/admin/dashboard',
  browsePageUrl: '/admin/browse',
  editPageUrl: '/admin/edit',
  defaultUserAvatarUrl: '/profiles/default_profile.png',
  formidableUploadUrl: '/tmp',
  kmImageStoreInPublicUrl: '/public/km',
};

export const merMerKMViewerConfig = {
  timeBeforeIncreaseView: 60 * 1000,
  timeForAutoSave: 60 * 1000,
};
