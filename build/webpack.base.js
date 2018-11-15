const path = require('path');
const rm = require('rimraf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const util = require('./util');

rm(path.join(__dirname, '../dist'), err => {
  if (err) throw err;
});

module.exports = {
  devtool: 'eval-source-map',
  entry: util.plugins().Entries,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: './js/[name].bundle.js'
  },
  module: {
    rules: util.rules()
  },
  plugins: util.plugins().plugins
};
