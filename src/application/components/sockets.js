var WebSockets = {
	socket: null,
	
	src: null,
	
	broadcast: function(eventType, data) {
		switch(eventType) {
			case 'keypress':
				this.socket.emit('response', { keypress: data });
				break;
			
			default:
				return;
		}		
	},
	
	init: function(src) {
		if(src !== undefined) {
			this.src = src;
		} else {
			console.warn('No hostname provided for WebSocket server');
		}
		
		this.socket = io.connect(this.src);
		
		this.socket.on('keypress', function (data) {
			setTimeout(Sampler.playAudio(data.key), 300);
			setTimeout(Sampler.playVideo(data.key), 300);

			console.log(data.key);			
		});
	}
};