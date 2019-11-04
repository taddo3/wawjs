 const async = require("async");
 const fs = require("fs");
 module.exports = saveSomewhere;

 function saveSomewhere(paths, data, cb) {
   const tasks = (paths, data, cb) => {
    fs.writeFile(path, data, (err) => {
   			if (err) return cb (err);
   			cb(null,tempFile);
   		})
   }
   async.tryEach(tasks, cb);
 }