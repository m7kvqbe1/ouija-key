var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Define static assets directory
app.use('/public', express.static(__dirname + '/public'));

server.listen(8080);

// Default route
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// WebSockets
io.on('connection', function(socket) {
	console.log('client connected');
	
	socket.on('trigger', function(data) {	
		socket.broadcast.emit('trigger', JSON.stringify(data));
		console.log(data);
	});
	
	socket.on('chat', function(data) {
		socket.broadcast.emit('chat', JSON.stringify(data));
		console.log(data);
	});
});