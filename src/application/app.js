$(document).ready(function() {
	// Initialize sampler
	Sampler.init('/public');
	
	// User Interface
	document.querySelector('#nav-toggle').addEventListener('click', function() {
		this.classList.toggle('active');
	});
});