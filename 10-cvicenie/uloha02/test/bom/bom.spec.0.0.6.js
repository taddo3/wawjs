const bom = require("../../src/bom/");
const assert = require("assert");
const fs = require("fs");

describe("bom.js tests", function() {


  const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

  it("[BUG] shall be called n times", (done) => {

    let called = 0;
    let chunks = [];

    let file = `${__dirname}/data/with-bom.txt`;
    fs.createReadStream(file, { highWaterMark: 1 })
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => {
        called++;
        chunks.push(chunk);

      })
      .on("finish", () => {
        let chunk = Buffer.concat(chunks);
        assert(called === "// with".length)
        done();
      });
  });
});