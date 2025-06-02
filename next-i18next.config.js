const path = require('path');

const i18nConfig = {
  i18n: {
    defaultLocale: 'tw',
    locales: ['tw', 'en', 'cn'],
    localeDetection: false,
  },
  localePath: path.resolve('./src/locales'),
};

module.exports = i18nConfig;
