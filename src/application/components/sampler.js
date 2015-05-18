var Sampler = (function(ui, socket) {
	var Module = {};
	
	var _assetRoot = '';
	
	var _assetCount = 104;	
	var _assetsLoaded = 0;
	
	var _preloadComplete = false;
	
	var _backgroundVideoElement = document.getElementById('#video-bg');
	var _backgroundVideoOverlayElement = document.getElementById('#video-overlay');
	
	Module.sounds = {
		q: "S01.wav",
		w: "S02.wav",
		e: "S03.wav",
		r: "S04.wav",
		t: "S05.wav",
		y: "S06.wav",
		u: "S07.wav",
		i: "S08.wav",
		o: "S09.wav",
		p: "S10.wav",
		a: "S11.wav",
		s: "S12.wav",
		d: "S13.wav",
		f: "S14.wav",
		g: "S15.wav",
		h: "S16.wav",
		j: "S17.wav",
		k: "S18.wav",
		l: "S19.wav",
		z: "S20.wav",
		x: "S21.wav",
		c: "S22.wav",
		v: "S23.wav",
		b: "S24.wav",
		n: "S25.wav",
		m: "S26.wav",
		Q: "S27.wav",
		W: "S28.wav",
		E: "S29.wav",
		R: "S30.wav",
		T: "S31.wav",
		Y: "S32.wav",
		U: "S33.wav",
		I: "S34.wav",
		O: "S35.wav",
		P: "S36.wav",
		A: "S37.wav",
		S: "S38.wav",
		D: "S39.wav",
		F: "S40.wav",
		G: "S41.wav",
		H: "S42.wav",
		J: "S43.wav",
		K: "S44.wav",
		L: "S45.wav",
		Z: "S46.wav",
		X: "S47.wav",
		C: "S48.wav",
		V: "S49.wav",
		B: "S50.wav",
		N: "S51.wav",
		M: "S52.wav"
	};
	
	Module.videos = {
		q: "01.webm",
		w: "02.webm",
		e: "03.webm",
		r: "04.webm",
		t: "05.webm",
		y: "06.webm",
		u: "07.webm",
		i: "08.webm",
		o: "09.webm",
		p: "10.webm",
		a: "11.webm",
		s: "12.webm",
		d: "13.webm",
		f: "14.webm",
		g: "15.webm",
		h: "16.webm",
		j: "17.webm",
		k: "18.webm",
		l: "19.webm",
		z: "20.webm",
		x: "21.webm",
		c: "22.webm",
		v: "23.webm",
		b: "24.webm",
		n: "25.webm",
		m: "26.webm",
		Q: "27.webm",
		W: "28.webm",
		E: "29.webm",
		R: "30.webm",
		T: "31.webm",
		Y: "32.webm",
		U: "33.webm",
		I: "34.webm",
		O: "35.webm",
		P: "36.webm",
		A: "37.webm",
		S: "38.webm",
		D: "39.webm",
		F: "40.webm",
		G: "41.webm",
		H: "42.webm",
		J: "43.webm",
		K: "44.webm",
		L: "45.webm",
		Z: "46.webm",
		X: "47.webm",
		C: "48.webm",
		V: "49.webm",
		B: "50.webm",
		N: "51.webm",
		M: "52.webm"
	};

	var _loadCheck = function(uri) {
		_assetsLoaded++;
		
		UserInterface.printDebug('Loading: ' + uri);
		
		if(_assetsLoaded === _assetCount) {
			_preloadComplete = true;
			
			$('.loading, #debug').addClass('hidden');
			$('#nav-toggle').addClass('show');
			
			if(!UserInterface.mobile) UserInterface.toggleMenuDisplay();
		}
	}
	
	var _preloadAudio = function(uri) {
		var audio = new Audio();
		
		$(audio).on('canplaythrough', function() {
			_loadCheck(uri);
		}, false);
		
		audio.src = uri;
		
		return audio;
	}
	
	var _preloadVideo = function(uri) {
		var source = document.createElement('source');
		source.src = uri;    
		source.type = 'video/webm';
		
		var video = document.createElement('video');
		video.appendChild(source);
		
		$(video).attr('id', 'video-overlay');
		
		$(video).on('canplaythrough', function() {
			_loadCheck(uri);
		}, false);
		
		return video;
	}
	
	Module.playAudio = function(key) {
		if(!_preloadComplete) return;
				
		// Create new audio element (allows for MPC note-repeat emulation)
		var audioElement = document.createElement('audio');
		$(audioElement).attr('autoplay', 'autoplay');
		$(audioElement).attr('src', Module.sounds[key].src);
	};
	
	Module.playVideo = function(key) {			
		if(!_preloadComplete) return;
		
		// Add preloaded video element to DOM (autoplay and loop)
		$('#video-wrapper').html(Module.videos[key].outerHTML);
		$('#video-wrapper video').attr('autoplay', 'autoplay');
		$('#video-wrapper video').attr('loop', 'loop');
	};
	
	Module.pauseVideo = function() {
		_backgroundVideoOverlayElement.pause();
	};
	
	Module.init = function(assetRoot) {
		if(UserInterface.mobile) return;
		
		if(typeof assetRoot !== 'undefined') {
			_assetRoot = assetRoot;
		} else {
			console.warn('Audio and video asset source undefined');
			return;
		}
		
		// Preload audio assets
		for(var property in Module.sounds) {			
			var fileName = Module.sounds[property];
			Module.sounds[property] = _preloadAudio(_assetRoot + '/audio/' + fileName);
		}
		
		// Preload video assets
		for(var property in Module.videos) {
			var fileName = Module.videos[property];
			Module.videos[property] = _preloadVideo(_assetRoot + '/video/' + fileName);
		}
		
		// Bind keypress event listener
		$(document).on('keypress', function(e) {
			var key = String.fromCharCode(e.which);
			
			if(UserInterface.promptActive || !Module.videos.hasOwnProperty(key)) return;
			
			WebSocket.broadcast('trigger', { key: key });
					
			// Using setTimeout to prevent overloading 
			// of the call stack and crashing the app
			setTimeout(Module.playAudio(key), 50);
			setTimeout(Module.playVideo(key), 50);
		});
	};
	
	return Module;
})(UserInterface, WebSocket);