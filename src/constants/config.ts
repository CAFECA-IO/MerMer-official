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

export const whyMermerIconSrcs = ['medal', 'hands', 'bulb', 'object'];
export const whyMermerTitleContents = [
  'HOME_PAGE.WHY_CHOOSE_MERMER_1_TITLE',
  'HOME_PAGE.WHY_CHOOSE_MERMER_2_TITLE',
  'HOME_PAGE.WHY_CHOOSE_MERMER_3_TITLE',
  'HOME_PAGE.WHY_CHOOSE_MERMER_4_TITLE',
];
export const whyMermerDescriptionContents = [
  'HOME_PAGE.WHY_CHOOSE_MERMER_1_DESCRIPTION',
  'HOME_PAGE.WHY_CHOOSE_MERMER_2_DESCRIPTION',
  'HOME_PAGE.WHY_CHOOSE_MERMER_3_DESCRIPTION',
  'HOME_PAGE.WHY_CHOOSE_MERMER_4_DESCRIPTION',
];

export const partnersContent = [
  {
    name: 'NCAF',
    image: '/partners/ncaf.svg',
    link: 'https://www.ncafroc.org.tw/',
  },
  {
    name: 'NSTC',
    image: '/partners/nstc.svg',
    link: 'https://www.nstc.gov.tw/',
  },
  {
    name: 'III',
    image: '/partners/iii.svg',
    link: 'https://www.iii.org.tw/zh-TW',
  },
  {
    name: 'FundSwap',
    image: '/partners/fundswap.svg',
    link: 'https://www.fundswap.com.tw/',
  },
  {
    name: 'iSunFA',
    image: '/partners/isunfa.svg',
    link: 'https://isunfa.tw/',
  },
  {
    name: 'FSC',
    image: '/partners/fsc.svg',
    link: 'https://www.fsc.gov.tw/ch/index.jsp',
  },
  {
    name: 'AsusCloud',
    image: '/partners/asuscloud.svg',
    link: 'https://www.asuscloud.com/',
  },
  {
    name: 'Tiger',
    image: '/partners/tiger.svg',
    link: 'https://www.itigerup.com/',
  },
  {
    name: 'TideBit',
    image: '/partners/tidebit.svg',
    link: 'https://tidebit-defi.com/',
  },
  {
    name: 'BAIFA',
    image: '/partners/baifa.svg',
    link: 'https://baifa.io/',
  },
  {
    name: 'AuthenTrend',
    image: '/partners/at.svg',
    link: 'https://secpaas.org.tw/W_Menu_CompanyDetail?viewkey=KMS6KrYtaNxjakB+Dt7Wj/RwfjNWmY7xsQYj5STGVA0=',
  },
];

export const visitTimeOptions = [
  '10:00 - 11:00',
  '11:00 - 12:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
];

export const mermerAddressInMap =
  'https://www.google.com/maps/place/110%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BF%A1%E4%B9%89%E5%8C%BA%E4%BF%A1%E7%BE%A9%E8%B7%AF%E4%BA%94%E6%AE%B5150%E5%B7%B72%E8%99%9F13%E6%A8%93%E4%B9%8B6/data=!4m2!3m1!1s0x3442abb275eba6e1:0x28987dcc88afff9a?sa=X&ved=1t:242&ictx=111';

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
