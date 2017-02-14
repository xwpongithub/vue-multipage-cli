const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');

exports.assetsPath = function (_path) {
  let assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
  options = options || {};
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    let sourceLoader = loaders.map(function (loader) {
      let extraParamChar;
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader = loader + '-loader';
        extraParamChar = '?';
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!');
    return ['vue-style-loader', sourceLoader].join('!')
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  let loaders= {
    css: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
  return loaders;
};

exports.prodCssLoaders = function(options){
  options = options || {};
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    let sourceLoader = loaders.map(function (loader) {
      if(loader.indexOf('?')>-1){
        let tmp = loader.split('?');
        loader = tmp[0]+'-loader?'+tmp[1];
      }else{
        loader = loader + '-loader';
      }
      return loader;
    });

    sourceLoader.splice(0,1,{
      loader:'css-loader',
      options: {
        sourceMap: options.sourceMap,
        minimize: true
      }
    });

    return ExtractTextPlugin.extract({
        use:sourceLoader,
        fallback:'vue-style-loader'
    });
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  let loaders= {
    css: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
  return loaders;
};

exports.styleLoaders = function (options) {
  let output = [];
  let loaders = exports.cssLoaders(options);

  for (let extension in loaders) {
    let loader = loaders[extension];
    let useLoaders;
    if(typeof loader === 'string') {
      useLoaders = loader.split('!');
      useLoaders.splice(useLoaders.length-1,0,{
        loader:'postcss-loader',
        options:{
          plugins:function(){
            return [
              require('autoprefixer')({
                browsers: ['last 2 versions']
              })
            ];
          }
        }
      });

      output.push({
        test: new RegExp('\\.' + extension + '$'),
        use: useLoaders
      });
    }
  }
  return output;
};

exports.prodStyleLoaders = function (options) {
  options = options || {};

  let output = [];

  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    let sourceLoader = loaders.map(function (loader) {
      return loader + '-loader';
    });
    if(sourceLoader.length!==1) {
      sourceLoader.splice(sourceLoader.length - 1, 0, {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')({
                browsers: ['last 2 versions']
              })
            ];
          }
        }
      });
    }else{
      sourceLoader.splice(sourceLoader.length, 0, {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')({
                browsers: ['last 2 versions']
              })
            ];
          }
        }
      });
    }
    sourceLoader.splice(0,1,{
      loader:'css-loader',
      options: {
        minimize: true
      }
    });

    return sourceLoader;
  }

  let loaders= {
    css: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  };

  for (let extension in loaders) {
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: ExtractTextPlugin.extract(loaders[extension])
    });
  }
  return output;
};
