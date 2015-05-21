var app = {};

$(document).ready(function() {
	app.userInterface = new UserInterface();
	
	app.webSocket = new WebSocket('http://tomhumphris.com:8080');
	
	app.sampler = new Sampler('/public');
});