const isDev = function() {
  return process.env.NODE_ENV === 'development';
};

/**
 * 处理器
 */
const rules = function() {
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const useJquery = require('../config').useJquery;
  const usePug = require('../config').usePug;
  const useTs = require('../config').useTypeScript;
  const path = require('path');
  let loaders = [];
  loaders = [
    {
      test: /\.html$/,
      use: ['html-loader']
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
        name: '[name].[hash:8].[ext]',
        outputPath: 'image/',
        publicPath: isDev() ?  '' : path.join(__dirname, '../dist/image'),
      }
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: '/node_modules/'
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

  if (useTs) {
    loaders.push({
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    });
  }

  if (usePug) {
    loaders.push({
      test: /\.pug$/,
      loader: ['pug-loader']
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

  return loaders;
};

/**
 * 创建打包路径
 */
const createFiles = function() {
  const usePug = require('../config').usePug;
  const useTypeScript = require('../config').useTypeScript;
  const path = require('path');
  const glob = require('glob');
  const result = [];
  const type = usePug ? 'pug' : 'html';
  const scriptType = useTypeScript ? 'ts' : 'js';
  const files = glob.sync(path.join(__dirname, `../src/views/**/*.${type}`));
  for (file of files) {
    result.push({
      name: usePug ? file.match(/\w{0,}(?=\.pug)/)[0] : file.match(/\w{0,}(?=\.html)/)[0],
      templatePath: file,
      jsPath: file.replace(type, scriptType),
      stylePath: file.replace(type, 'stylus')
    });
  }
  return result;
};

/**
 * 插件
 */
const plugins = function() {
  const files = createFiles();
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const path = require('path');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const webpack = require('webpack');

  let htmlPlugins = [];
  let Entries = {};
  files.map(file => {
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: `${file.name}.html`,
        template: file.templatePath,
        chunks: [file.name]
      })
    );
    Entries[file.name] = file.jsPath;
  });

  return {
    plugins: [
      ...htmlPlugins,
      new ExtractTextPlugin({
        filename: getPath => {
          return getPath('css/[name].css');
        }
      }),
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

exports.rules = rules();
exports.plugins = plugins();
