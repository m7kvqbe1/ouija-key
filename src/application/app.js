$(document).ready(function() {
	WebSockets.init('http://tomhumphris.com:8080');
	
	Sampler.init('/public');
	
	Interface.init();
});