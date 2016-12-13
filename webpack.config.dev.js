/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'dev'),
    inline: true,
    port: 7777,
    historyApiFallback: true,
    compress: false,
  },
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react']
      }
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dev'),
    filename: 'bundle.js',
  },
};

