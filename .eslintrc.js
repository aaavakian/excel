module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'arrow-parens': 'off'
  }
};
