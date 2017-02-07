const path = require('path');
const glob = require('glob');

const projectJs = path.resolve(__dirname,'../src/js');
const globalPath = projectJs+'/**/*.js';

let entries = ((globalPath)=>{

  let entries = {},
    entryName;

  glob.sync(globalPath).forEach((entryPath)=>{
    entryName = path.basename(entryPath, path.extname(entryPath));
    entries[entryName] = entryPath;
  });

  return {entry:entries};

})(globalPath);

module.exports = entries;
