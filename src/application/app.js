$(document).ready(function() {
	Interface.init();
	
	WebSocket.init('http://tomhumphris.com:8080');
	
	Sampler.init('/public');
});