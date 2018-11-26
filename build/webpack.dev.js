const merge = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');
const webpack = require('webpack');
const useEslint = require('../config').useEslint;

const rules = function() {
  let loaders = [];

  if (useEslint) {
    loaders.push({
      test: /\.js$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [path.resolve(__dirname, 'src')],
      options: {
        formatter: require('stylish')
      }
    });
  }

  return loaders;
};

module.exports = merge(base, {
  mode: 'development',

  devServer: {
    contentBase: [path.join(__dirname, '../dist')],
    port: 9000,
    hot: true,
    after: () => {
      console.log('');
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ].concat(rules())
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
});
