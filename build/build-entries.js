const path = require('path');
const fs = require('fs');
const utils = require('./utils');

let buildEntries = {};

/*获取所有模块的文件夹名*/
const modules = fs.readdirSync(path.join(utils.resolve('src'),'modules'));

for (let moduleName of modules) {
  buildEntries[moduleName] = path.join(utils.resolve('src'),'modules',moduleName,'main.js');
}

module.exports = buildEntries;
