var WebSockets = {
	socket: null,
	
	serverUri: null,
	
	init: function(serverUri) {
		if(serverUri !== undefined) {
			this.socketLocation = serverUri;
		} else {
			console.warn('No URI provided for WebSocket server');
		}
		
		this.socket = io.connect(this.serverUri);
		this.socket.on('message', function (data) {
			console.log(data);
			this.socket.emit('phone-home', { my: 'data' });
		});	
	}
};