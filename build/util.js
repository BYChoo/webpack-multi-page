const isDev = function() {
  return process.env.NODE_ENV === 'development';
};

/**
 * 处理器
 */
const rules = function() {
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const path = require('path');
  const useEslint = require('../config').useEslint;
  const useJquery = require('../config').useJquery;
  let loaders = [];
  loaders = [
    {
      // 通过require('jquery')来引入
      test: require.resolve('jquery'),
      use: [
        {
          loader: 'expose-loader',
          // 暴露出去的全局变量的名称 随便你自定义
          options: 'jQuery'
        },
        {
          // 同上
          loader: 'expose-loader',
          options: '$'
        }
      ]
    },
    {
      test: /\.css$/,
      use: isDev()
        ? ['style-loader', 'css-loader']
        : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: '[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.js$/,
      use: ['babel-loader']
    },
    {
      test: /\.stylus$/,
      use: isDev()
        ? ['style-loader', 'css-loader', 'stylus-loader', 'postcss-loader']
        : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader', 'postcss-loader']
        })
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  ];

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

  if (useJquery) {
    loaders.push({
      // 通过require('jquery')来引入
      test: require.resolve('jquery'),
      use: [
        {
          loader: 'expose-loader',
          // 暴露出去的全局变量的名称 随便你自定义
          options: 'jQuery'
        },
        {
          // 同上
          loader: 'expose-loader',
          options: '$'
        }
      ]
    });
  }

  if (isDev()) {
    loaders.push({
      test: /\.html$/,
      loader: 'raw-loader'
    });
  }
  return loaders;
};

/**
 * 插件
 */
const plugins = function() {
  const pages = require('../config.js').pages;
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const cleanWebpackPlugin = require('clean-webpack-plugin');
  const path = require('path');
  const webpack = require('webpack');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  let htmlPlugins = [];
  let Entries = {};
  pages.map(page => {
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: `${page.name}.html`,
        template: path.join(__dirname, `../src/page/${page.name}.html`),
        chunks: [page.name]
      })
    );
    Entries[page.name] = path.join(__dirname, `../src/script/${page.name}.js`);
  });

  if (isDev()) {
    htmlPlugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    plugins: [
      ...htmlPlugins,
      new ExtractTextPlugin({
        filename: getPath => {
          return getPath('css/[name].css');
        }
      }),
      new cleanWebpackPlugin(['../dist']),
      new CopyWebpackPlugin([
        {
          // 源文件目录
          from: path.join(__dirname, '../static'),
          // 目标目录 dist目录下
          to: 'static',
          // 筛选过滤，这里复制所有文件，连同文件夹
          ignore: ['.*']
        }
      ])
    ],
    Entries
  };
};

exports.rules = rules;
exports.plugins = plugins;
