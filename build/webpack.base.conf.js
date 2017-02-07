const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');
const entries = require('./entries');

const projectRoot = path.resolve(__dirname, '../');
const projectSrc = path.resolve(projectRoot,'./src');

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
       'components': path.resolve(projectSrc, 'components'),
       'styl': path.resolve(projectSrc, 'styl'),
       'vue$': 'vue/dist/vue.common.js'
     },
     extensions:['.js','.vue','.json','.styl']
   },
   module: {
     rules: [
       {
         test: /\.js$/,
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
         use: [{
           loader:'vue-loader',
           options: {
             loaders: {
               css: ExtractTextPlugin.extract({
                 loader: 'css-loader',
                 fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
               }),
               stylus:ExtractTextPlugin.extract({
                 loader: 'css-loader!postcss-loader!stylus-loader',
                 fallbackLoader: 'vue-style-loader',
               })
             }
           }
         }]
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
         test: /\.styl$/,
         use: ExtractTextPlugin.extract(['css-loader','postcss-loader','stylus-loader'])
       },
       {
         test: /favicon\.png$/,
         use: [{
           loader: 'file-loader',
           options: {
             name: '[name].[ext]?[hash]'
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
             name:'img/[name].[hash:7].[ext]'
           }
         }]
       }
     ]
   }
});

module.exports = baseConfig;
