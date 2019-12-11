const http = require('http');
const zlib = require('zlib');

const fs = require('fs');
const { pipeline } = require("stream");

module.exports = zip_server;

function zip_server(file_path) {

  // req, rsp, TODO error handling
  const request_handler = (req, rsp) => {

    let created_gzip = zlib.createGzip();

    // vytvorenie pomocneho adresara
    fs.mkdir(file_path, () => {

      const file_name = req.headers['file_name'];
      const write_stream = fs.createWriteStream(`${file_path}/${file_name}`);

      pipeline(req, write_stream, (err) => {
        if (err) {
          console.error('Server error: Unable to write stream');
          throw 'Server error: Unable to write stream';
        }
      });

      pipeline(req, created_gzip, rsp, (err) => {
        if (err) {
          console.error('Server error: Unable to send gzipped file');
          throw 'Server error: Unable to send gzipped file';
        }
      });

    });
  }

  // se
  return http.createServer(request_handler)
    .on('error', (err) => {
    throw console.error('Server error: ', err.code);
  });

}