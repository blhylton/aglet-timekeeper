const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

function makeTemplate(name, obj) {
  const template = {
    alwaysWriteToDisk: true,
    inject: 'body',
    filename: `${name}.html`,
    template: `${srcPath}/${name}.html`,
    hash: 'true',
    cache: 'true',
    chunks: [name],
  };

  return Object.assign({}, template, obj);
}

module.exports = {
  entry: `${srcPath}/index.js`,

  output: {
    filename: '[name].js',
    path: distPath,
    publicPath: '/',
  },

  module: {
    rules: [{
      test: /\.js$/,
      include: /(src)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-0', 'react'],
        },
      },
    }, {
      test: /\.svg/,
      use: [{
        loader: 'url-loader',
      }],
    }, {
      test: /(\.scss)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]',
            minimize: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }],
  },

  plugins: [
    new HtmlWebpackPlugin(makeTemplate('index')),
    new HtmlWebpackHarddiskPlugin({
      outputPath: distPath,
    }),
    new CopyWebpackPlugin([{
      from: `${srcPath}/assets`,
      to: `${distPath}/assets`,
    }]),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: true,
      sourceMap: true,
    }),
  ],
};
