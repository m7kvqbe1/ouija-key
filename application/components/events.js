'use strict';

var Events = (function() {	
	var emit = function(eventName, paramObj) {
		var event;
		
		if(typeof paramObj !== 'undefined') {
			event = new CustomEvent(eventName, paramObj);
		} else {
			event = new Event(eventName);
		}
		
		document.dispatchEvent(event);
	};
	
	// Return public methods and properties
	return {
		emit: emit
	};
})();

module.exports = Events;