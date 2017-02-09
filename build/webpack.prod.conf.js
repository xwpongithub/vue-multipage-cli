const path = require('path');
const glob = require('glob');
const config = require('../config');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = config.build.env;
const baseWebpackConfig = require('./webpack.base.conf');

const projectSrc = path.resolve(__dirname,'../src');
const projectJs = path.resolve(__dirname,'../src/js');
const globalPath = projectJs+'/**/*.js';

let webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap:config.build.productionSourceMap
    }),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    /*
    new webpack.optimize.CommonsChunkPlugin({
       names: ['vendor','manifest'],
       minChunks: function (module, count) {
         // any required modules inside node_modules are extracted to vendor
         return (
           module.resource &&
           /\.js$/.test(module.resource) &&
           module.resource.indexOf(
             path.join(__dirname, '../node_modules')
           ) === 0
         )
       }
    }),
    */
  ]
});

let entries = ((globalPath)=>{

  let entryNames = [],
    entryName;

  glob.sync(globalPath).forEach((entryPath)=>{
    entryName = path.basename(entryPath, path.extname(entryPath));
    entryNames.push(entryName);
  });

  return entryNames;

})(globalPath);

webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  names: ['vendors','manifest'],
  chunks: entries, //提取哪些模块共有的部分
  minChunks: entries.length
}));

webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
 name: 'manifest',
 chunks: ['vendor']
}));

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

let pages = ((globalPath)=>{
  let htmlFiles = {},
    pageName;

  glob.sync(globalPath).forEach((pagePath)=>{
    let tmp='';
    let basename = path.basename(pagePath, path.extname(pagePath));
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
    filename: pagePath + '.html',
    template: pages[pagePath]['path'],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    chunks: [pages[pagePath]['chunk'],'vendor','manifest'],
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  };
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports =  webpackConfig;
