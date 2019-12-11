const http = require('http');
const fs = require('fs');

const { pipeline } = require("stream");
const path = require('path');


module.exports = zip_client;

function zip_client(port, file_path) {

  // dopln cestu?
  const write_stream = fs.createWriteStream(`${file_path}.gz`);
  const read_stream = fs.createReadStream(file_path);
  
  const http_req = http.request(

    { 
      host: 'localhost', 
      port, 
      method: 'POST',
    },


    response => {
      pipeline(response, write_stream, (err) => {
        if (err) {
          console.error('File has not been written');
          throw 'File has not been written';
        }
      });
    }

  );

  fs.stat(file_path, (err, stats) => {
    // vyskusat ci zachyti
    if (err){
      console.error('Unable to open file');
      throw 'Unable to open file';
    }

    // header z netu, snad ok
    let base_path = path.parse(file_path).base
    http_req.setHeader('file_name', base_path);
    

    pipeline(read_stream, http_req, (err) => {
      if (err) {
        //
        fs.unlinkSync(`${file_path}.gz`);
        console.error('Unable to send file');
        throw 'Unable to send file';
      }
    });

  });

  return http_req;

}