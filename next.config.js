/** @type {import('next').NextConfig} */
const {i18n} = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  env: {
    REACT_APP_MERMER_PHONE: process.env.REACT_APP_MERMER_PHONE,
    REACT_APP_MERMER_EMAIL: process.env.REACT_APP_MERMER_EMAIL,
    REACT_APP_MERMER_COPYRIGHT: process.env.REACT_APP_MERMER_COPYRIGHT,
  },
};

module.exports = nextConfig;
