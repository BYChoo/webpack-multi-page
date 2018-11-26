const merge = require('webpack-merge');
const base = require('./webpack.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const rm = require('rimraf');

rm(path.join(__dirname, '../dist'), err => {
  if (err) throw err;
});

module.exports = merge(base, {
  mode: 'production',
  plugins: [new UglifyJSPlugin()]
});
