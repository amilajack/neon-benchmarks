const path = require('path');

module.exports = {
  extends: 'bliss',
  rules: {
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: [require.resolve('./package.json')] }
    ]
  }
};
