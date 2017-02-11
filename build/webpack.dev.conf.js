const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

const config = require('../config');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.conf');
const projectSrc = path.resolve(__dirname,'../src');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

let devConfig =  merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new FriendlyErrors()
  ]
});

let pages = ((globalPath)=>{
  let htmlFiles = {},
    pageName;

  glob.sync(globalPath).forEach((pagePath)=>{
    var tmp='';
    var basename = path.basename(pagePath, path.extname(pagePath));
    if(pagePath.indexOf('pages')>-1){
      tmp = pagePath.split('/').slice(-2,-1).join('')+'/'+basename;
    }else{
      tmp = 'index';
    }
    pageName = tmp;
    htmlFiles[pageName] = {};
    htmlFiles[pageName]['chunk'] = basename;
    htmlFiles[pageName]['path'] = pagePath;
  });
  return htmlFiles;
})(projectSrc+'/**/*.html');

for (let pagePath in pages) {
  let conf = {
    // 生成出来的html文件名
    filename: pagePath + '.html',
    // 每个html的模版，这里多个页面使用同一个模版
    template: pages[pagePath]['path'],
    // 自动将引用插入html
    inject: true,
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    chunks: ['vendor','manifest',pages[pagePath]['chunk']]
  };
  // https://github.com/ampedandwired/html-webpack-plugin
  /*入口文件对应html文件（配置多个，一个页面对应一个入口，通过chunks对应）*/
  devConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = devConfig;

