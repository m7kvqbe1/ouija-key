var Interface = {
	chatEnabled: true,
	chatActive: false,
	
	menuActive: false,
	
	displayDebug: function(message) {
		$('#debug').text(message).removeClass('hidden');
	},
	
	toggleMenuDisplay: function() {
		if(this.chatActive) {
			this.toggleChat();
		}
		
		document.querySelector('#nav-toggle').classList.toggle('active');
		document.querySelector('.menu').classList.toggle('hidden');	
		document.querySelector('.version').classList.toggle('hidden');
				
		this.menuActive = (this.menuActive) ? false : true;
	},
	
	toggleChatDisplay: function() {
		if(this.menuActive || !this.chatEnabled) {
			return;
		}
		
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
	
	toggleChat: function() {
		document.querySelector('.chat-messages').classList.toggle('hidden');
		
		this.chatEnabled = (this.chatEnabled) ? false : true;
		
		var text = (this.chatEnabled) ? 'Enabled' : 'Disabled';
		$('.chat-toggle-text').html(text);
	},
	
	init: function() {
		_this = this;
		
		// Bind open / close menu event listener
		document.querySelector('#nav-toggle').addEventListener('click', function() {
			_this.toggleMenuDisplay();
		});
		
		// Bind keyboard shortcuts event listener
		document.addEventListener('keyup', function(e) {
			switch(e.keyCode) {
				// Return key
				case 13:
					if(_this.chatActive && !_this.menuActive) {						
						var message = $('.chat-input input').val();
						
						WebSockets.broadcast('chat', { message: message });
						
						_this.printChatMessage(message);
						
						_this.toggleChatDisplay();
					} else {
						_this.toggleChatDisplay();
					}
					break;
				
				// Escape key
				case 27:
					if(_this.chatActive) {
						_this.toggleChatDisplay();
					} else {
						_this.toggleMenuDisplay();
					}
					break;
				
				default:
					return;
			}
		});
		
		// Bind toggle chat event listener
		document.querySelector('#toggleChat').addEventListener('click', function() {
			_this.toggleChat();
		});
	}
};

// Hit return to open chat message window (set flag to prevent keypress sample triggers)

// Hitting return key again when chat flag set sends message to WebSocket for broadcast

// On receiving chat event from socket add message to chat messages window

// Fade / animate out last message (max 5 messages visible)