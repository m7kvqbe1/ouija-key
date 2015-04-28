var Interface = {
	chatActive: false,
	
	displayDebug: function(message) {
		$('#debug').text(message).removeClass('hidden');
	},
	
	toggleChat: function() {
		document.querySelector('.chat-input').classList.toggle('hidden');
		document.querySelector('.chat-input input').focus();
		$('.chat-input input').val('');
		
		this.chatActive = (this.chatActive) ? false : true;
	},
	
	printChatMessage: function(message) {
		if(message !== undefined) {
			$('.chat-messages').prepend('<span class="message">' + message + '</span>');	
		}
	},
	
	init: function() {
		_this = this;
		
		// Open close menu
		document.querySelector('#nav-toggle').addEventListener('click', function() {
			this.classList.toggle('active');
		});
		
		// Chat
		document.addEventListener('keyup', function(e) {
			switch(e.keyCode) {
				case 13:
					if(_this.chatActive) {
						var payload = {
							message: $('.chat-input input').val()
						}
						
						WebSockets.broadcast('chat', payload);
						
						_this.toggleChat();
					} else {
						_this.toggleChat();
					}
					break;
				
				case 27:
					if(_this.chatActive) {
						_this.toggleChat();
					}
					break;
				
				default:
					return;
			}
		});
	}
};

// Hit return to open chat message window (set flag to prevent keypress sample triggers)

// Hitting return key again when chat flag set sends message to WebSocket for broadcast

// On receiving chat event from socket add message to chat messages window

// Fade / animate out last message (max 5 messages visible)