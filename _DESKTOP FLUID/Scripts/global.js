// ------------------------------------------------------------------------------------------------
// Document Ready
// ------------------------------------------------------------------------------------------------
$(function() {
		   	
	// ------------------------------------------------------------------------------------------------
	// Ervoor zorgen dat bij overgang van portrait naar landscape de scale mee gaat
	// http://adactio.com/journal/4470/
	// ------------------------------------------------------------------------------------------------

	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		var viewportmeta = document.querySelector('meta[name="viewport"]');
		if (viewportmeta) {
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
			document.body.addEventListener('gesturestart', function () {
				viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
			}, false);
		}
	}



});