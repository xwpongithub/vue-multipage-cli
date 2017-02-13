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
     extensions:['.js','.vue','.json','.styl']
   },
   module: {
     rules: [
       {
         test: /\.(js|vue)$/,
         include:[projectSrc],
         exclude: /node_modules/,
         enforce: 'pre',
         use: [{
           loader: 'eslint-loader',
           options:{
             formatter:require('eslint-friendly-formatter')
           }
         }],
       },
       {
         test: /\.vue$/,
         include:[projectSrc],
         exclude: /node_modules/,
         loader:'vue-loader',
         options: {
           postcss: [require('autoprefixer')({
             browsers: ['last 2 versions']
           })],
           loaders: prodEnv?utils.prodCssLoaders({
               sourceMap: config.build.productionSourceMap,
             }):utils.cssLoaders({ sourceMap: useCssSourceMap })
         }
       },
       {
         test: /\.js$/,
         use: ['babel-loader'],
         include:[projectSrc],
         exclude: /node_modules/
       },
       {
         test: /\.html$/,
         use: [{
           loader: 'html-loader',
           options: {
             root: projectSrc,
             attrs: ['img:src', 'link:href']
           }
         }]
       },
       {
         test: /favicon\.png$/,
         use: [{
           loader: 'file-loader',
           options: {
             name: utils.assetsPath('[name].[ext]?[hash]')
           }
         }]
       },
       {
         test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
         exclude: /favicon\.png$/,
         use: [{
           loader: 'url-loader',
           options: {
             limit: 10000,
             name:utils.assetsPath('img/[name].[hash:7].[ext]')
           }
         }]
       }
     ]
   }
});

module.exports = baseConfig;
