const path = require('path');

const projectJs = path.resolve(__dirname,'../src/js');

/*
 *  js入口配置
 * */
module.exports = {
    entry:{
      index:projectJs+'/index.js',
      user:projectJs+'/user.js'
    }
};
