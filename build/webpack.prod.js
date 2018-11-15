const merge = require('webpack-merge');
const base = require('./webpack.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  plugins: [new UglifyJSPlugin()]
});
