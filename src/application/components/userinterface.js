var UserInterface = function() {
	var mobile = false;
	
	var chatEnabled = true;
	
	var menuActive = false;

	var promptActive = false;
	
	var toggleMenuDisplay = function() {
		if(promptActive) {
			closePrompt();
		}
		
		$('#nav-toggle').toggleClass('active');
		$('.menu').toggleClass('hidden');
				
		menuActive = (menuActive) ? false : true;
	};
	
	var toggleMenuItem = function(selector) {
		$(selector).toggleClass('disabled');
	};
	
	var toggleChat = function() {
		$('.chat-messages').toggleClass('hidden');
		$('#menu-toggle-chat').toggleClass('disabled');
		
		var text = (chatEnabled) ? 'Disabled' : 'Enabled';
		$('.chat-toggle-text').text(text);
		
		chatEnabled = (chatEnabled) ? false : true;
	};
	
	var clearChat = function() {
		$('.chat-messages').html('');
	};
	
	var hideChatMessage = function() {
		$('.chat-messages :last-child').remove();
	};
	
	var printChatMessage = function(message) {		
		if(typeof message !== 'undefined' && message !== '') {			
			$('.chat-messages').prepend('<span class="message">' + message + '</span>');
			
			if($('.chat-messages span').length > 5) {
				hideChatMessage();
			}
		}
	};
	
	var showRoomId = function(roomid, err) {
		if(err) {
			$('#room-id').html('Room ID Invalid');
			
			setTimeout(function() {
				if(app.webSocket.room) {
					$('#room-id').html('<strong>Current Room ID:</strong><br /><span>' + app.webSocket.room + '</span>');
				} else {
					$('#room-id').html('');
				}
			}, 4000);
		} else {
			$('#room-id').html('<strong>Current Room ID:</strong><br /><span>' + roomid + '</span>');
		}
		
		$('#room-id').removeClass('hidden');
	};
	
	var hideRoomId = function() {
		$('#room-id').addClass('hidden');
	};
	
	var printDebug = function(message) {
		$('#debug').text(message);
		$('#debug').removeClass('hidden');
		
	};
	
	var openPrompt = function(message, type) {
		$('#prompt input').attr('placeholder', message);
		$('#prompt input').val('');
		$('.version, .shortcuts').addClass('hidden');
		$('#prompt').removeClass('hidden');
		$('#prompt').attr('data-type', type);
		document.querySelector('#prompt input').focus();
		
		promptActive = true;
	};
	
	var closePrompt = function() {
		$('#prompt').addClass('hidden');
		$('.version, .shortcuts').removeClass('hidden');
		
		promptActive = false;
	};
	
	var promptAction = function() {
		var type = $('#prompt').attr('data-type');
		
		switch(type) {
			case 'chat':
				var message = $('#prompt input').val();
				
				app.webSocket.broadcast('chat', { message: message });
				
				printChatMessage(message);
				break;
			
			case 'join':
				var uuid = $('#prompt input').val();
				
				if(!/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(uuid)) {
					showRoomId(null, true);
					return;	
				}
				
				if(app.webSocket.room) app.webSocket.leaveRoom();
				
				app.webSocket.joinRoom(uuid);
				break;
				
			default:
				break;
		}
		
		closePrompt();
	};
	
	var browserCheck = function() {
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobile = true;
			$('video, .chat-messages').addClass('hidden');
			$('.loading .inner').html('<span>Sorry, Ouija Key is intended to be used with a keyboard. Please come back soon using a laptop or desktop computer.</span>');
		}		
	};

	var init = (function() {		
		browserCheck();
		
		// Bind open / close menu button event listener
		$('#nav-toggle').on('click', function() {
			toggleMenuDisplay();
		});
		
		// Bind keyboard shortcuts event listener
		$(document).on('keyup', function(e) {
			switch(e.keyCode) {
				// Return key
				case 13:
					if(promptActive) {
						promptAction();
					} else if(!menuActive && chatEnabled) {
						openPrompt('Enter your message', 'chat');
					}
					return;
				
				// Escape key
				case 27:				
					if(promptActive) {
						closePrompt()
					} else {
						toggleMenuDisplay();
					}
					return;
				
				default:
					return;
			}
		});
		
		// Bind toggle chat event listener
		$('#menu-toggle-chat').on('click', function() {
			toggleChat();
		});
		
		// Bind create new room event listener
		$('#menu-new').on('click', function() {
			app.webSocket.generateRoom();
		});
		
		// Bind leave current room event listener
		$('#menu-leave').on('click', function() {
			app.webSocket.leaveRoom();
		});
		
		// Join room click event listener
		$('#menu-join').on('click', function() {
			// Open dialogue box to enter room GUID
			openPrompt('Enter room ID', 'join');
		});
		
		// Close prompt
		$('#prompt .icon-close').on('click', function() {
			closePrompt();
		});
		
		// Clean out a message from the chat window every 40 seconds
		(function cleanChat() {
			setTimeout(function() {
				hideChatMessage();
				cleanChat();
			}, 40000);	
		})();
	})();
	
	return {
		mobile: mobile,
		chatEnabled: chatEnabled,
		menuActive: menuActive,
		promptActive: promptActive,
		toggleMenuDisplay: toggleMenuDisplay,
		toggleMenuItem: toggleMenuItem,
		toggleChat: toggleChat,
		clearChat: clearChat,
		hideChatMessage: hideChatMessage,
		printChatMessage: printChatMessage,
		showRoomId: showRoomId,
		hideRoomId: hideRoomId,
		printDebug: printDebug,
		openPrompt: openPrompt,
		closePrompt: closePrompt,
		promptAction: promptAction,
		browserCheck: browserCheck
	};
};