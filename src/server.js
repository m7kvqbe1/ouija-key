var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// Define static assets directory
app.use('/public', express.static(__dirname + '/public'));

// Default route send client app
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// Redirect to www
app.all(/.*/, function(req, res, next) {
  var host = req.header("host");
  if (host.match(/^www\..*/i)) {
    next();
  } else {
    res.redirect(301, "http://www." + host);
  }
});

server.listen(8080);

// WebSocket
io.on('connection', function(socket) {
	console.log('client connected');
	
	// Relay sample triggers
	socket.on('trigger', function(data) {
		var obj = JSON.parse(data);
		
		if(typeof obj.room !== 'undefined') {
			socket.broadcast.to(obj.room).emit('trigger', data);	
		} else {
			socket.broadcast.emit('trigger', data);	
		}
		
		console.log(obj);
	});
	
	// Relay chat messages
	socket.on('chat', function(data) {			
		var obj = JSON.parse(data);
		
		if(typeof obj.room !== 'undefined') {
			socket.broadcast.to(obj.room).emit('chat', data);
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