/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
'use strict';

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var fs = require('fs');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
		}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "template": "index.ejs",
    }),
    new ChunkManifestPlugin({
      "filename": "chunk-manifest.json",
      "manifestVariable": "webpackManifest",
    }),
    function () {
      this.plugin('done', function(stats) {
        fs.writeFileSync(
            path.join(__dirname, 'stats.json'),
            JSON.stringify(stats.toJson())
        );
      });
    },
  ],
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react']
      }
    }, {
      //loader: 'style!css!sass',
      //test: /\.s?css/,
      //exclude: /(node_modules|bower_components)/,
    //}, {
      test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
      loader: 'imports?define=>false&this=>window'
    }],
  },
  resolve: {
    extensions: ['', '.js'],
  },
  externals: {
    "$": "jQuery",
    "jQuery": "jQuery",
    "react": "React",
    "react-dom": "ReactDOM",
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: '__build__/bundle.[chunkhash].js',
  },
};

