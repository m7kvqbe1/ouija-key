var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Define static assets directory
app.use('/public', express.static(__dirname + '/public'));

server.listen(8080);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/application/index.html');
});

io.on('connection', function (socket) {
	socket.emit('message', { hello: 'world' });
	socket.on('response', function (data) {
		console.log(data);
	});
});