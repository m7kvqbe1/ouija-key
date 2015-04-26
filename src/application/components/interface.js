var Interface = {
	displayDebug: function(message) {
		$('#debug').text(message).removeClass('hidden');
	},
	
	init: function() {
		document.querySelector('#nav-toggle').addEventListener('click', function() {
			this.classList.toggle('active');
		});
	}
};