const server = require('../src/zip-server');
const client = require('../src/zip-client');
const assert = require("assert");
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const server_port = 8001;

const lorem_txt_path = `${__dirname}/lorem_ipsum.txt`;
const dir_path = `${__dirname}/dir_helper`;
const base_gz = `${path.parse(lorem_txt_path).base}.gz`


describe("Simple tests", () => {

    it("Check if lorem ipsum was send correctly", () => {

        let zip_server = server(dir_path).listen(server_port);

        client(server_port, lorem_txt_path)
            .on('finish', ()=>{
            zip_server.close();
        });

        // test inspirovany kamosom, digesty pre kontrolu ci sa rovnaju
        zip_server.on('close', () => {
            const original = fs.readFileSync(lorem_txt_path);
            const sended = fs.readFileSync(`${dir_path}/lorem_ipsum.txt`);
            
            const original_digest = crypto.createHash('sha1').update(original).digest().toString();
            const seended_digest = crypto.createHash('sha1').update(sended).digest().toString();
            assert(original_digest === seended_digest);

            fs.unlinkSync(`${dir_path}/lorem_ipsum.txt`);
            fs.unlinkSync(`${__dirname}/${base_gz}`);
        });
    });


    it("Unreachable zip-server", () => {

        client(server_port, lorem_txt_path).on('close', () => {

            assert(!fs.existsSync(`${__dirname}/${base_gz}`));

        });
    });
    

});