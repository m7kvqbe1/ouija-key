$(document).ready(function() {
	// Preload audio assets
	for(var property in Sampler.sounds) {
		if(Sampler.hasOwnProperty('sounds')) {			
			var fileName = Sampler.sounds[property];
			Sampler.sounds[property] = Sampler.preloadAudio(Sampler.assetRoot + '/audio/' + fileName);
		}
	}
	
	// Preload video assets
	for(var property in Sampler.videos) {
		if(Sampler.hasOwnProperty('videos')) {
			var fileName = Sampler.videos[property];
			Sampler.videos[property] = Sampler.preloadVideo(Sampler.assetRoot + '/video/' + fileName);
		}
	}
});

document.addEventListener('keypress', function(e) {
	setTimeout(Sampler.playAudio(e), 300);
	setTimeout(Sampler.playVideo(e), 300);
});