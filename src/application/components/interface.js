var Interface = {
	chatEnabled: true,
	chatActive: false,
	
	menuActive: false,
	
	displayDebug: function(message) {
		$('#debug').text(message).removeClass('hidden');
	},
	
	toggleChat: function() {
		if(this.menuActive) {
			return;
		}
		
		document.querySelector('.chat-input').classList.toggle('hidden');
		document.querySelector('.chat-input input').focus();
		$('.chat-input input').val('');
		
		this.chatActive = (this.chatActive) ? false : true;
	},
	
	toggleMenu: function() {
		if(this.chatActive) {
			this.toggleChat();
		}
		
		document.querySelector('#nav-toggle').classList.toggle('active');
		document.querySelector('.menu').classList.toggle('hidden');	
		document.querySelector('.version').classList.toggle('hidden');
				
		this.menuActive = (this.menuActive) ? false : true;
	},
	
	printChatMessage: function(message) {
		if(message !== undefined) {
			$('.chat-messages').prepend('<span class="message">' + message + '</span>');	
		}
	},
	
	init: function() {
		_this = this;
		
		// Bind open / close menu event listener
		document.querySelector('#nav-toggle').addEventListener('click', function() {
			_this.toggleMenu();
		});
		
		// Bind keyboard shortcuts event listener
		document.addEventListener('keyup', function(e) {
			switch(e.keyCode) {
				case 13:
					if(_this.chatActive && !_this.menuActive) {						
						var message = $('.chat-input input').val();
						
						WebSockets.broadcast('chat', { message: message });
						
						_this.printChatMessage(message);
						
						_this.toggleChat();
					} else {
						_this.toggleChat();
					}
					break;
				
				case 27:
					if(_this.chatActive) {
						_this.toggleChat();
					} else {
						_this.toggleMenu();
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