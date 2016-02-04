const http = require('http');
const express = require('express');
const serveIndex = require('serve-index');

var app = express();

var input = process.argv[2] || '';
var port = 9999;

app.use(express.static(__dirname + input));
app.use('/', serveIndex(__dirname + input));

http.createServer(app).listen(port, function(){
	console.log('Server listening on port ' + port);
});