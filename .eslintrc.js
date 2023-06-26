module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // 支援 ECMAScript2020
    sourceType: 'module', // 使用 ECMAScript ****module
    ecmaFeatures: {
      jsx: true, // 支援 JSX
      experimentalObjectRestSpread: true,
    },
  },
  // 加上 ts 相關規則
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
  ],
  extends: ['plugin:import/typescript'],
  // 加上 no console log 規則
  rules: {
    'no-console': 'error',
  },
  // 整合 prettier 和解決 prettier 衝突問題
  plugins: ['prettier'],
};
