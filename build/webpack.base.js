const path = require('path');
const util = require('./util');

module.exports = {
  devtool: 'eval-source-map',
  entry: util.plugins.Entries,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: './js/[name].bundle.js'
  },
  module: {
    rules: util.rules
  },
  plugins: util.plugins.plugins,
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true
    }
  }
};
