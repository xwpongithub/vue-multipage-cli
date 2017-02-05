const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');
const projectSrc = path.resolve(__dirname,'../src');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    /*入口文件对应html文件（配置多个，一个页面对应一个入口，通过chunks对应）*/
    new HtmlWebpackPlugin({
      // 生成出来的html文件名
      filename: 'index.html',
      // 每个html的模版，这里多个页面使用同一个模版
      template: projectSrc+'/index.html',
      // 自动将引用插入html
      inject: true,
      // 每个html引用的js模块，也可以在这里加上vendor等公用模块
      chunks: ['vendor','manifest','index']
    }),
    new ExtractTextPlugin({
      filename:'style.css'
    }),
    new FriendlyErrors()
  ]
});
