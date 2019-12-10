const bom = require("../../src/bom/");
const assert = require("assert");
const fs = require("fs");

describe("bom.js tests", function() {


  const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

  it("[BUG] removeBom - shell remove bom from file not containing bom ", function(done) {

    var chunks = [];

    let file = `${__dirname}/data/without-bom.txt`;
    
    fs.createReadStream(file)

      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);
  
        assert(Buffer.isBuffer(chunk));
        assert.equal(chunk.length, 10);
        assert.equal(chunk[0], 0x2f);
        assert.equal(chunk.indexOf(bomBuffer), -1);
        
        done();
      })
  });
});