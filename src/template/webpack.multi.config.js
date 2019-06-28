const path = require('path');

module.exports = {
  entry: {
    index: ['./src/index.ts'],
    about: ['./src/about.ts'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
  },
};
