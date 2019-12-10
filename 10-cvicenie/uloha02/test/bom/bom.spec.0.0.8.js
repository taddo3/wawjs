const bom = require("../../src/bom/");
const assert = require("assert");
const fs = require("fs");

describe("bom.js tests", function() {


  const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

  it("[BUG] removeBom - shell remove bom from file containing bom", (done) => {

    var chunks = [];

    let file = `${__dirname}/data/with-bom.txt`;
    fs.createReadStream(file)
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);

        fs.readFile(file, (err, data) => {
          assert(
            chunk.equals(data.slice(3)),
            `unexpected \n${JSON.stringify(chunk)}`
          );
          done();
        });

      });
  });
});