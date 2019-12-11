const server = require('../src/zip-server');
const client = require('../src/zip-client');
const listen_port = 8001;
const helper_dir = 'dir_helper';
const test_txt = 'lorem_ipsum.txt'


const zip_server = server(helper_dir).listen(listen_port, ()=> {
	// eh
    console.log('Listening at ' + listen_port);
});

// argumenty alebo testovaci subor
client(listen_port, process.argv[2] ? process.argv[2] : test_txt)
	.on('finish', () => {
    zip_server.close();
});