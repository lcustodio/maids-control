'use strict';

var
  path = require('path'),
  webpack = require('webpack'),
  //htmlWebpackPlugin = require('html-webpack-plugin'),
  srcPath = path.join(__dirname, 'public/js');

module.exports = {
  //devtool: 'eval-source-map',
  entry: [
    //'webpack-hot-middleware/client?reload=true',
    path.join(srcPath, 'app.js')
  ],
  output: {
    path: srcPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    //new htmlWebpackPlugin({
    //  template: 'app/index.tpl.html',
    //  inject: 'body',
    //  filename: 'index.html'
    //}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
    //  {
    //  test: /\.js?$/,
    //  exclude: /node_modules/,
    //  loader: 'babel'
    //},
      {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }]
  }
};
