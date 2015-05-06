var Interface = {
	chatEnabled: true,
	chatActive: false,
	
	menuActive: false,
	
	printDebug: function(message) {
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
	
	toggleChat: function() {
		document.querySelector('.chat-messages').classList.toggle('hidden');
		document.querySelector('#menu-toggle-chat').classList.toggle('disabled');
		
		var text = (this.chatEnabled) ? 'Disabled' : 'Enabled';
		$('.chat-toggle-text').html(text);
		
		this.chatEnabled = (this.chatEnabled) ? false : true;
	},
	
	hideChatMessage: function() {
		$('.chat-messages :last-child').remove();
	},
	
	printChatMessage: function(message) {
		_this = this;
		
		if(message !== undefined && message !== '') {
			$('.chat-messages').prepend('<span class="message">' + message + '</span>');
			
			if($('.chat-messages span').length > 5) {
				_this.hideChatMessage();
			}
		}
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
		
		// Clean out a message from the chat window every 40 seconds
		(function cleanChat() {
			setTimeout(function() {
				_this.hideChatMessage();
				cleanChat();
			}, 40000);	
		})();
		
		// Bind toggle chat event listener
		document.querySelector('#menu-toggle-chat').addEventListener('click', function() {
			_this.toggleChat();
		});
		
		// Bind join session via GUID event listener
		document.querySelector('#menu-join').addEventListener('click', function() {
			// Open dialogue box to get room GUID
			
			// Join room
			
			// Make leave session active
		});
		
		// Bind create new session event listener
		document.querySelector('#menu-new').addEventListener('click', function() {
			WebSockets.generateRoom();
			console.log(WebSockets.room);
		});
		
		// Bind leave current session event listener
		document.querySelector('#menu-leave').addEventListener('click', function() {
			WebSockets.leaveRoom();
		});
	}
};