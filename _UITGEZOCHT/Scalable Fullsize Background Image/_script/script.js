$(document).ready(function() {   
	
	
	// START resize 'background' img en set scroll
	
	resizeBg();
	
	$(window).resize(function() {
		resizeBg();
	});
	
	function resizeBg() {
		var widthWindow = $(window).width()
		var widthBg = $('#background-img').width();
		
		var heightWindow = $(window).height()
		var heightBg = $('#background-img').height();
		
		if (heightWindow > heightBg) {
			$('#background-img').removeClass();
			$('#background-img').addClass('bgheight');
		}
		
		if (widthWindow > widthBg) {
			$('#background-img').removeClass();
			$('#background-img').addClass('bgwidth');
		}
		
		$('#container').height(heightWindow - 22); /* wat bepaald min waarde */
	}
	
	// END resize 'background' img
	


		
});















