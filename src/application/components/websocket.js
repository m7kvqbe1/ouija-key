var WebSocket = function(uri) {
	var _host = '';
	
	var _socket = null;
	
	var room = null;
	
	var _generateUuid = function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
	  
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};
	
	var joinRoom = function(roomId) {
		if(typeof roomId === 'undefined') {
			console.warn('Please specify a room to join');
			return;
		}
		
		room = roomId;
		_socket.emit('join', room);
		
		if($('#menu-leave').hasClass('disabled')) {
			app.userInterface.toggleMenuItem('#menu-leave');
		}
		
		app.userInterface.showRoomId(room);
	};
	
	var leaveRoom = function() {
		_socket.emit('leave', room);
		room = null;
		
		if(!$('#menu-leave').hasClass('disabled')) {
			app.userInterface.toggleMenuItem('#menu-leave');
		}
		
		app.userInterface.hideRoomId();
	};
	
	var generateRoom = function() {
		// Leave current room
		if(room) leaveRoom();
		
		// Generate hash for room ID and join room
		room = _generateUuid();
		joinRoom(room);
		
		return room;
	};

	var broadcast = function(eventType, payload) {
		if(room) {
			payload.room = room;	
		}
		
		payload = JSON.stringify(payload);
		
		_socket.emit(eventType, payload);
	};
	
	var init = (function() {
		if(typeof uri === 'undefined') {
			console.warn('No URI provided for server');
			return;
		}
		
		_host = uri;
		
		// Create socket
		_socket = io.connect(_host);
		
		// Trigger samples from socket event
		_socket.on('trigger', function(data) {
			var obj = JSON.parse(data);
			
			// Using setTimeout to prevent overloading
			// of the call stack and crashing the app
			setTimeout(app.sampler.playAudio(obj.key), 50);
			setTimeout(app.sampler.playVideo(obj.key), 50);
		});
		
		// Display chat message from socket event
		_socket.on('chat', function(data) {
			var obj = JSON.parse(data);
						
			app.userInterface.printChatMessage(obj.message);
		});
	})();
	
	// Return public methods and properties
	return {
		room: room,
		joinRoom: joinRoom,
		leaveRoom: leaveRoom,
		generateRoom: generateRoom,
		broadcast: broadcast	
	};
};