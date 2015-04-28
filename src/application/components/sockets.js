var WebSockets = {
	socket: null,
	
	host: null,
	
	broadcast: function(eventType, payload) {
		this.socket.emit(eventType, JSON.stringify(payload));
	},
	
	init: function(uri) {
		if(uri !== undefined) {
			this.host = uri;
		} else {
			console.warn('No URI provided for server');
		}
		
		this.socket = io.connect(this.host);
		
		this.socket.on('trigger', function (data) {
			setTimeout(Sampler.playAudio(data.key), 300);
			setTimeout(Sampler.playVideo(data.key), 300);

			console.log(data.key);			
		});
	}
};