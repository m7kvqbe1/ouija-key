var WebSockets = {
	socket: null,
	
	host: '',
	
	broadcast: function(eventType, payload) {
		this.socket.emit(eventType, JSON.stringify(payload));
	},
	
	init: function(uri) {
		if(uri !== undefined) {
			this.host = uri;
		} else {
			console.warn('No URI provided for server');
			return;
		}
		
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