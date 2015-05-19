var WebSocket = (function() {
	var exports = {};
	
	var host = '';
	
	var socket = null;
	
	exports.room = null;
	
	var _generateUuid = function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
	  
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};
	
	exports.generateRoom = function() {
		// Leave current room
		if(exports.room) exports.leaveRoom();
		
		// Generate hash for room ID and join room
		exports.room = _generateUuid();
		exports.joinRoom(exports.room);
		
		return exports.room;
	};

	exports.broadcast = function(eventType, payload) {
		if(exports.room) {
			payload.room = exports.room;	
		}
		
		payload = JSON.stringify(payload);
		
		socket.emit(eventType, payload);
	};
	
	exports.joinRoom = function(room) {
		if(typeof room === 'undefined') {
			console.warn('Please specify a room to join');
			return;
		}
		
		exports.room = room;
		socket.emit('join', room);
		
		if($('#menu-leave').hasClass('disabled')) {
			UserInterface.toggleMenuItem('#menu-leave');
		}
		
		UserInterface.showRoomId(room);
	};
	
	exports.leaveRoom = function() {
		socket.emit('leave', exports.room);
		exports.room = null;
		
		if(!$('#menu-leave').hasClass('disabled')) {
			UserInterface.toggleMenuItem('#menu-leave');
		}
		
		UserInterface.hideRoomId();
	};
	
	exports.init = function(uri) {
		if(typeof uri === 'undefined') {
			console.warn('No URI provided for server');
			return;
		}
		
		host = uri;
		
		// Create socket
		socket = io.connect(host);
		
		// Trigger samples from socket event
		socket.on('trigger', function(data) {
			var obj = JSON.parse(data);
			
			// Using setTimeout to prevent overloading
			// of the call stack and crashing the app
			setTimeout(Sampler.playAudio(obj.key), 50);
			setTimeout(Sampler.playVideo(obj.key), 50);
		});
		
		// Display chat message from socket event
		socket.on('chat', function(data) {
			var obj = JSON.parse(data);
						
			UserInterface.printChatMessage(obj.message);
		});
	};
	
	return exports;
})();