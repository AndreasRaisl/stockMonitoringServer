const path = require('path');

const getParentDir = function getParentDirectory() {
  let parentDir = path.join(__dirname, '..');
  return parentDir;
};

const rootDir = path.dirname(process.mainModule.filename);

module.exports.getParentDir = getParentDir;
module.exports.rootDirectory = rootDir;
