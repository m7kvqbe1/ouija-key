var Interface = {
	menuActive: false,
	chatActive: false,
	
	chatEnabled: true,
	
	toggleMenuDisplay: function() {
		if(this.chatActive) {
			this.toggleChat();
		}
		
		$('#nav-toggle').toggleClass('active');
		$('.menu').toggleClass('hidden');	
		$('.version').toggleClass('hidden');
				
		this.menuActive = (this.menuActive) ? false : true;
	},
	
	toggleMenuItem: function(selector) {
		$(selector).toggleClass('disabled');
	},
	
	toggleChatPrompt: function() {
		if(this.menuActive || !this.chatEnabled) {
			return;
		}
		
		this.openPrompt('Enter your message');
		
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
		if(typeof message !== 'undefined' && message !== '') {			
			$('.chat-messages').prepend('<span class="message">' + message + '</span>');
			
			if($('.chat-messages span').length > 5) {
				this.hideChatMessage();
			}
		}
	},
	
	showRoomId: function(roomid) {
		$('#room-id > span').text(roomid);
		$('#room-id').removeClass('hidden');
	},
	
	hideRoomId: function() {
		$('#room-id').addClass('hidden');
	},
	
	printDebug: function(message) {
		$('#debug').text(message);
		$('#debug').removeClass('hidden');
		
	},
	
	openPrompt: function(message) {
		$('#prompt input').attr('placeholder', message);
		$('#prompt input').val('');
		$('.version, .shortcuts').addClass('hidden');
		$('#prompt').removeClass('hidden');
		document.querySelector('#prompt input').focus();
	},
	
	closePrompt: function() {
		$('#prompt').addClass('hidden');
	},
	
	init: function() {
		self = this;
		
		// Bind open / close menu event listener
		$('#nav-toggle').on('click', function() {
			self.toggleMenuDisplay();
		});
		
		// Bind keyboard shortcuts event listener
		$(document).on('keyup', function(e) {
			switch(e.keyCode) {
				// Return key
				case 13:
					if(self.chatActive && !self.menuActive) {						
						var message = $('.console-input input').val();
						
						WebSocket.broadcast('chat', { message: message });
						
						self.printChatMessage(message);
						
						self.toggleChatPrompt();
					} else {
						self.toggleChatPrompt();
					}
					break;
				
				// Escape key
				case 27:				
					if(self.chatActive) {
						self.toggleChatPrompt();
					} else {
						self.toggleMenuDisplay();
					}
					break;
				
				default:
					return;
			}
		});
		
		// Bind toggle chat event listener
		$('#menu-toggle-chat').on('click', function() {
			self.toggleChat();
		});
		
		// Bind create new session event listener
		$('#menu-new').on('click', function() {
			WebSocket.generateRoom();
		});
		
		// Bind leave current session event listener
		$('#menu-leave').on('click', function() {
			WebSocket.leaveRoom();
		});
		
		// Join room click event listener
		$('#menu-join').on('click', function() {
			// Open dialogue box to get room GUID
			self.openPrompt('Enter room ID');
		});
		
		// Clean out a message from the chat window every 40 seconds
		(function cleanChat() {
			// Using setTimeout prevents filling up the call stack
			setTimeout(function() {
				self.hideChatMessage();
				cleanChat();
			}, 40000);	
		})();
	}
};