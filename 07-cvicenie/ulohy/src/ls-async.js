const fs = require("fs").promises;
const path = require("path")

module.exports = lsRescursive



async function ls(dirName) {
  return require("fs").readdirSync(dirName, {
    withFileTypes: true
  });
}

function dirsOnly(files) {
  return files.filter((f) => f.isDirectory());
}

function filesOnly(files) {
  return files.filter((f) => f.isFile());
}




async function lsRescursive(dirName) {

  let files = await ls(dirName);
  let dirs = dirsOnly(files);

  dirs = dirs.map(({ name }) => name);
  dirs = dirs.map(name => path.resolve(dirName, name));
  let all = dirs.map(ls);

  return Promise.all(all)
    .then(files => [].concat(...files))
    .then(filesOnly)
    .then((files) =>
      files.map(({ name }) => name)
    )

}