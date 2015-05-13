var WebSocket = {
	host: '',
	
	socket: null,
	room: null,
	
	generateGuid: function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
	  
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	},

	broadcast: function(eventType, payload) {
		if(this.room) {
			payload.room = this.room;	
		}
		
		payload = JSON.stringify(payload);
		
		this.socket.emit(eventType, payload);
	},
	
	joinRoom: function(room) {
		if(typeof room === 'undefined') {
			console.warn('Please specify a room to join');
			return;
		}
		
		this.room = room;
		this.socket.emit('join', this.room);
		
		if($('#menu-leave').hasClass('disabled')) {
			Interface.toggleMenuItem('#menu-leave');
		}
		
		Interface.showRoomId(this.room);
	},
	
	leaveRoom: function() {
		this.socket.emit('leave', this.room);
		this.room = null;
		
		if(!$('#menu-leave').hasClass('disabled')) {
			Interface.toggleMenuItem('#menu-leave');
		}
		
		Interface.hideRoomId();
	},
	
	generateRoom: function() {
		// Generate hash for room ID and join room
		this.room = this.generateGuid();
		this.joinRoom(this.room);
		
		return this.room;
	},
	
	init: function(uri) {
		if(typeof uri === 'undefined') {
			console.warn('No URI provided for server');
			return;
		}
		
		this.host = uri;
		
		// Create socket
		this.socket = io.connect(this.host);
		
		// Trigger samples from socket event
		this.socket.on('trigger', function(data) {
			var obj = JSON.parse(data);
			
			setTimeout(Sampler.playAudio(obj.key), 300);
			setTimeout(Sampler.playVideo(obj.key), 300);
		});
		
		// Display chat message from socket event
		this.socket.on('chat', function(data) {
			var obj = JSON.parse(data);
						
			Interface.printChatMessage(obj.message);
		});
	}
};