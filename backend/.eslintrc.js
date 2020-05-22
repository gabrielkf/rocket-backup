module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 1,
    'consistent-return': 0,
    'no-console': 0,
  },
};
