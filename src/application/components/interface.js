var UserInterface = {
	mobile: false,
	
	chatEnabled: true,
	
	menuActive: false,

	promptActive: false,
	
	toggleMenuDisplay: function() {
		if(this.promptActive) {
			this.closePrompt();
		}
		
		$('#nav-toggle').toggleClass('active');
		$('.menu').toggleClass('hidden');
				
		this.menuActive = (this.menuActive) ? false : true;
	},
	
	toggleMenuItem: function(selector) {
		$(selector).toggleClass('disabled');
	},
	
	toggleChat: function() {
		$('.chat-messages').toggleClass('hidden');
		$('#menu-toggle-chat').toggleClass('disabled');
		
		var text = (this.chatEnabled) ? 'Disabled' : 'Enabled';
		$('.chat-toggle-text').text(text);
		
		this.chatEnabled = (this.chatEnabled) ? false : true;
	},
	
	clearChat: function() {
		$('.chat-messages').html('');
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
	
	openPrompt: function(message, type) {
		$('#prompt input').attr('placeholder', message);
		$('#prompt input').val('');
		$('.version, .shortcuts').addClass('hidden');
		$('#prompt').removeClass('hidden');
		$('#prompt').attr('data-type', type);
		document.querySelector('#prompt input').focus();
		
		this.promptActive = true;
	},
	
	closePrompt: function() {
		$('#prompt').addClass('hidden');
		$('.version, .shortcuts').removeClass('hidden');
		
		this.promptActive = false;
	},
	
	promptAction: function() {
		var type = $('#prompt').attr('data-type');
		
		switch(type) {
			case 'chat':
				var message = $('#prompt input').val();
				
				WebSocket.broadcast('chat', { message: message });
				
				this.printChatMessage(message);
				break;
			
			case 'join':
				var guid = $('#prompt input').val();
				
				if(guid === '') return;
				
				if(WebSocket.room) WebSocket.leaveRoom();
				
				WebSocket.joinRoom(guid);
				break;
				
			default:
				break;
		}
		
		this.closePrompt();
	},
	
	browserCheck: function() {
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			this.mobile = true;
			$('video, .chat-messages').addClass('hidden');
			$('.loading .inner').html('<span>Sorry, Ouija Key is intended to be used with a keyboard. Please come back soon using a laptop or desktop computer.</span>');
		}		
	},

	init: function() {
		_this = this;
		
		this.browserCheck();
		
		// Bind open / close menu button event listener
		$('#nav-toggle').on('click', function() {
			_this.toggleMenuDisplay();
		});
		
		// Bind keyboard shortcuts event listener
		$(document).on('keyup', function(e) {
			switch(e.keyCode) {
				// Return key
				case 13:
					if(_this.promptActive) {
						_this.promptAction();
					} else if(!_this.menuActive && _this.chatEnabled) {
						_this.openPrompt('Enter your message', 'chat');
					}
					return;
				
				// Escape key
				case 27:				
					if(_this.promptActive) {
						_this.closePrompt()
					} else {
						_this.toggleMenuDisplay();
					}
					return;
				
				default:
					return;
			}
		});
		
		// Bind toggle chat event listener
		$('#menu-toggle-chat').on('click', function() {
			_this.toggleChat();
		});
		
		// Bind create new room event listener
		$('#menu-new').on('click', function() {
			WebSocket.generateRoom();
		});
		
		// Bind leave current room event listener
		$('#menu-leave').on('click', function() {
			WebSocket.leaveRoom();
		});
		
		// Join room click event listener
		$('#menu-join').on('click', function() {
			// Open dialogue box to enter room GUID
			_this.openPrompt('Enter room ID', 'join');
		});
		
		// Close prompt
		$('#prompt .icon-close').on('click', function() {
			_this.closePrompt();
		});
		
		// Clean out a message from the chat window every 40 seconds
		(function cleanChat() {
			setTimeout(function() {
				_this.hideChatMessage();
				cleanChat();
			}, 40000);	
		})();
	}
};