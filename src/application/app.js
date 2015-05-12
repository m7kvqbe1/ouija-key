$(document).ready(function() {
	WebSocket.init('http://tomhumphris.com:8080');
	
	Sampler.init('/public');
	
	Interface.init();
});