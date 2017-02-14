const path = require('path');
const merge = require('webpack-merge');

const config = require('../config');
const utils = require('./utils');
const entries = require('./entries');

const projectRoot = path.resolve(__dirname, '../');
const projectSrc = path.resolve(projectRoot,'./src');

let env = process.env.NODE_ENV;
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file

let developEnv = env === 'development';
let prodEnv = env === 'production';

let cssSourceMapDev = (developEnv && config.dev.cssSourceMap);
let cssSourceMapProd = ( prodEnv&& config.build.productionSourceMap);
let useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

let baseConfig = merge(entries,{
   output:{
     path: config.build.assetsRoot,
     publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
     chunkFilename: '[id].[chunkhash].js',
     filename: '[name].js'
   },
   resolve: {
     alias: {
       'common': path.resolve(projectSrc, 'common'),
       'modules':  path.resolve(projectSrc, 'modules'),
       'components': path.resolve(projectSrc, 'components'),
       'styl': path.resolve(projectSrc, 'styl'),
       'vue$': 'vue/dist/vue.common.js'
     },
     //Tell webpack what directories should be searched when resolving modules.
     modules: [
       resolve('src'),
       resolve('node_modules')
     ],
     extensions:['.js','.vue','.json','.styl']
   },
   module: {
     rules: [
       {
         test: /\.(js|vue)$/,
         enforce: 'pre',
         include: [resolve('src')],
         use: [{
           loader: 'eslint-loader',
           options:{
             formatter:require('eslint-friendly-formatter')
           }
         }],
       },
       {
         test: /\.vue$/,
         include:[resolve('src')],
         loader:'vue-loader',
         options: {
           postcss: [require('autoprefixer')({
             browsers: ['last 2 versions']
           })],
           loaders: utils.cssLoaders({
             sourceMap: prodEnv
               ? config.build.productionSourceMap
               : config.dev.cssSourceMap,
             extract: prodEnv
           })
         }
       },
       {
         test: /\.js$/,
         use: ['babel-loader'],
         include:[resolve('src')],
       },
       {
         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
         loader: 'url-loader',
         query: {
           limit: 10000,
           name: utils.assetsPath('img/[name].[hash:7].[ext]')
         }
       },
       {
         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
         loader: 'url-loader',
         query: {
           limit: 10000,
           name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
         }
       }
     ]
   }
});

module.exports = baseConfig;
