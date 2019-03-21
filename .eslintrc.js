module.exports = {
  parser: 'babel-eslint',
  rules: {
    'react/prefer-stateless-function': 'off',
    // 'import/prefer-default-export': 'off',
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', './src'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  env: {
    browser: true,
  },
};
