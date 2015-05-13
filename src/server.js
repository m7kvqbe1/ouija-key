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

// WebSocket
io.on('connection', function(socket) {
	console.log('client connected');
	
	socket.on('trigger', function(data) {
		var obj = JSON.parse(data);
		
		if(typeof obj.room !== 'undefined') {
			socket.broadcast.to(obj.room).emit('trigger', data);	
		} else {
			socket.broadcast.emit('trigger', data);	
		}
		
		console.log(obj);
	});
	
	socket.on('chat', function(data) {			
		var obj = JSON.parse(data);
		
		if(typeof obj.room !== 'undefined') {
			io.sockets.in(obj.room).emit('chat', data);	
		} else {
			socket.broadcast.emit('chat', data);
		}
		
		console.log(obj);
	});
	
	// Join room
	socket.on('join', function(room) {
		socket.join(room);
		
		console.log('joining room', room);
	});
	
	// Leave room
	socket.on('leave', function(room) {
		socket.leave(room);
		
		console.log('leaving room', room);
	});
});