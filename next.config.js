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
  // Info(20240131) Murky transpilePackage, reactStrictMode, webpack is for mdxEditor
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  reactStrictMode: true,
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true }
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config
  }
};

module.exports = nextConfig;
