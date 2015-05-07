var Interface = {
	chatEnabled: true,
	chatActive: false,
	
	menuActive: false,
	
	printDebug: function(message) {
		$('#debug').text(message);
		$('#debug').removeClass('hidden');
		
	},
	
	toggleMenuDisplay: function() {
		if(this.chatActive) {
			this.toggleChat();
		}
		
		$('#nav-toggle').toggleClass('active');
		$('.menu').toggleClass('hidden');	
		$('.version').toggleClass('hidden');
				
		this.menuActive = (this.menuActive) ? false : true;
	},
	
	toggleChatDisplay: function() {
		if(this.menuActive || !this.chatEnabled) {
			return;
		}
				
		$('.chat-input').toggleClass('hidden');
		$('.chat-input input').val('');
		document.querySelector('.chat-input input').focus();
		
		this.chatActive = (this.chatActive) ? false : true;
	},
	
	toggleChat: function() {
		$('.chat-messages').toggleClass('hidden');
		$('#menu-toggle-chat').toggleClass('disabled');
		
		var text = (this.chatEnabled) ? 'Disabled' : 'Enabled';
		$('.chat-toggle-text').text(text);
		
		this.chatEnabled = (this.chatEnabled) ? false : true;
	},
	
	hideChatMessage: function() {
		$('.chat-messages :last-child').remove();
	},
	
	printChatMessage: function(message) {		
		if(message !== undefined && message !== '') {			
			$('.chat-messages').prepend('<span class="message">' + message + '</span>');
			
			if($('.chat-messages span').length > 5) {
				this.hideChatMessage();
			}
		}
	},
	
	toggleMenuItem: function(selector) {
		$(selector).toggleClass('disabled');
	},
	
	init: function() {
		_this = this;
		
		// Bind open / close menu event listener
		$('#nav-toggle').on('click', function() {
			_this.toggleMenuDisplay();
		});
		
		// Bind keyboard shortcuts event listener
		$(document).on('keyup', function(e) {
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
		
		// Clean out a message from the chat window every 40 seconds
		(function cleanChat() {
			setTimeout(function() {
				_this.hideChatMessage();
				cleanChat();
			}, 40000);	
		})();
		
		// Bind toggle chat event listener
		$('#menu-toggle-chat').on('click', function() {
			_this.toggleChat();
		});
		
		// Bind create new session event listener
		$('#menu-new').on('click', function() {
			WebSockets.generateRoom();
			console.log(WebSockets.room);
		});
		
		// Bind leave current session event listener
		$('#menu-leave').on('click', function() {
			WebSockets.leaveRoom();
		});
		
		// Bind join session via GUID event listener
		$('#menu-join').on('click', function() {
			// Open dialogue box to get room GUID
			
			// Join room
			
			// Make leave session active
		});
	}
};