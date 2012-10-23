// ------------------------------------------------------------------------------------------------
// Document Ready
// ------------------------------------------------------------------------------------------------
$(function() {


	// ------------------------------------------------------------------------------------------------
	// Set vars
	// ------------------------------------------------------------------------------------------------
	var playedMovie01 = false,
		playedMovie02 = false,
		playedMovie03 = false;

	// ------------------------------------------------------------------------------------------------
	// Get Mail Id from Url to add to iframe url
	// ------------------------------------------------------------------------------------------------
	getUrlVariables();
	
	// ------------------------------------------------------------------------------------------------
	// Check for cookie values and set values to questions
	// ------------------------------------------------------------------------------------------------
	readCookie();
		
	// ------------------------------------------------------------------------------------------------
	// Set Main Click Events
	// ------------------------------------------------------------------------------------------------
	
	$('#page-02').show();
	
	$('#btn-home, #page-03-nav .btn-prev').click(function(event) {
		// Toon Uitleg page
		event.preventDefault();
		$('p.message, #btn-home').hide();
		$('.page').hide();
		$('.page-nav').hide();
		$('#page-02').show();
		$('#page-02-nav').show();
	});
	
	$('.btn-start, #page-04-nav .btn-prev').click(function(event) {
		// Toon Vraag 1 page
		event.preventDefault();
		$('p.message').hide();
		$('.page').hide();
		$('.page-nav').hide();
		$('#page-03, #btn-home').show();
		$('#page-03-nav').show();
		
		/* Show movie if not already auto played  */
		if(!playedMovie01) {
			$("img#start-video-1").click();
			playedMovie01 = true;
		}
	});
	
	$('#page-03-nav .btn-next, #page-05-nav .btn-prev').click(function(event) {
		// Toon Vraag 2 page
		event.preventDefault();
		addValuesToCookie();
		if(validateFormValue('vraag1')) {
			$('.page').hide();
			$('.page-nav').hide();
			$('#page-04, #btn-home').show();
			$('#page-04-nav').show();
			
			/* Show movie if not already auto played */
			if(!playedMovie02) {
				$("img#start-video-2").click();
				playedMovie02 = true;
			}
		}
	});
	
	$('#page-04-nav .btn-next, #page-06-nav .btn-prev').click(function(event) {
		// Toon Vraag 3 page
		event.preventDefault();
		addValuesToCookie();
		if(validateFormValue('vraag2')) {
			$('.page').hide();
			$('.page-nav').hide();
			$('#page-05, #btn-home').show();
			$('#page-05-nav').show();
			
			/* Show movie if not already auto played */
			if(!playedMovie03) {
				$('#lightbox').show();
				$("img#start-video-3").click();
				playedMovie03 = true;
			}
		}
		$('#column-container').css('background', 'url(Images/main-frame-v2.png) no-repeat 0 0'); // change background
	});
	
	$('#page-05-nav .btn-next').click(function(event) {
		// Toon Bonus vraag/ Mailplus form page
		event.preventDefault();
		addValuesToCookie();
		if(validateFormValue('vraag3')) {
			$('.page').hide();
			$('.page-nav').hide();
			$('#page-06, #btn-home').show();
			$('#page-06-nav').show();
		}
		
		// Set iFrame only if it doesn't already exist
		if($("#formIframe").length === 0) {
			setIframe();
		}
		$('#column-container').css('background', 'url(Images/main-frame.png) no-repeat 0 0'); // change background
	});

	
	// ------------------------------------------------------------------------------------------------
	// Set Video Player Click Events
	// ------------------------------------------------------------------------------------------------
	
	// Load movies
	$("img#start-video-1").click(function(){
		basicVideoSetup('http://dl1.streamzilla.jet-stream.nl/bitsquad/Malmberg/sensor-vraag-1.mp4');
	});
	
	$("img#start-video-2").click(function(){
		basicVideoSetup('http://dl1.streamzilla.jet-stream.nl/bitsquad/Malmberg/sensor-vraag-2.mp4');
	});
	
	$("img#start-video-3").click(function(){
		basicVideoSetup('http://dl1.streamzilla.jet-stream.nl/bitsquad/Malmberg/sensor-vraag-3.mp4');
	});
	
	// Close layer
	$("#close-video, #btn-answer").click(function(){
		jwplayer("movie-player").stop();
		$('#lightbox').hide();
	});
		
	
	
});

