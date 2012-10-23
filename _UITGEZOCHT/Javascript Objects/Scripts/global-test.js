// ------------------------------------------------------------------------------------------------
// Set Complete event for video player
// ------------------------------------------------------------------------------------------------

function setVideoComplete() {
	jwplayer("movie-player").onComplete(function(event) {
		jwplayer("movie-player").stop();
		$lightbox.hide();
	});
}


// ------------------------------------------------------------------------------------------------
// Video Player : Homepage
// ------------------------------------------------------------------------------------------------
function basicVideoSetup(setFile){
	
	$lightbox.show();
	
	jwplayer("movie-player").setup({
		flashplayer: "Video/player.swf",
		icons: false,
		height: "427",
		width: "760",
		autostart: true,
		allowfullscreen: false,
		controlbar: "bottom",
		file: setFile
	});
	
	setVideoComplete();
}

	
// ------------------------------------------------------------------------------------------------
// Get Mail Id from Url
// ------------------------------------------------------------------------------------------------

function guv(name){  
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	
	var regexS = "[\\?&]"+name+"=([^&#]*)",
		regex = new RegExp( regexS ),
		results = regex.exec( window.location.href );  
		
	if( results === null )    
		return "";  
	else    
		return results[1];
}
		
function getUrlVariables(e){

	// Haal de uit de mail meegestuurde persoonlijke code op.
	// Deze staat in de variabele mailplusid
	var mpIdParam = guv('mailplusid');
	
	if (mpIdParam === undefined || mpIdParam === ""){
		$.cookie('mpid', 'empty', { path: '/' });
	} else {
		$.cookie('mpid', mpIdParam, { path: '/' });
	}
}

// ------------------------------------------------------------------------------------------------
// Add form values to Cookies
// ------------------------------------------------------------------------------------------------

function addValuesToCookie() {
  var fields = $(":radio").serializeArray();
      
  jQuery.each(fields, function(i, field){
	if(i===0){
		// vraag 1
		$.cookie('vraag1', field.value, { path: '/' });
	}
	if(i===1){
		// vraag 2
		$.cookie('vraag2', field.value, { path: '/' });
	}
	if(i===2){
		// vraag 3
		$.cookie('vraag3', field.value, { path: '/' });
	}
	
  });
}




// ------------------------------------------------------------------------------------------------
// Check for cookie values and set values to questions
// ------------------------------------------------------------------------------------------------

function readCookie() {
	var i=1;
	// loop thrue the 3 questions
	// Get the value from the cookie and force a click on the radio button
	for (i=1;i<=3;i++) {
		var q = 'vraag' + i,
			selectorVraag = 'input:radio[name=Vraag' + i + '][value=' + $.cookie(q) +  ']';
		$(selectorVraag).click();
	}
}


// ------------------------------------------------------------------------------------------------
// Set iFrame
// ------------------------------------------------------------------------------------------------

	// Check if mpid (Mailplus id) was send with url
	// If so build iFrame url with this id so the form is prefilled
	// Else iFrame url is the normal link to the form
	// Always add the 3 answers as vars in the url
	// These will be collected by a small javascript in de Mailplus form page
	
function setIframe() {
	
	// Build the cookie url part containing the 3 answers
	var cookieUrlPart = "&antw1=" + $.cookie('vraag1') + "&antw2=" + $.cookie('vraag2') + "&antw3=" + $.cookie('vraag3');
	
	// If mpid is filled override the buildUrl var
	if ($.cookie('mpid') === "empty" || $.cookie('mpid') === null || $.cookie('mpid') === undefined || $.cookie('mpid') === "" ){
		// Build Url without mpid
		var completeUrl = "http://Malmberg.m10.mailplus.nl/wpGWXhxTqYUx-16181-31000101-31087555-aEtBWuLaEnu9CRz" + cookieUrlPart;
	} else {
		// Build Url with mpid
		var completeUrl = "http://Malmberg.m10.mailplus.nl/wpGWXhxTqYUx-16181-31000101-" + $.cookie('mpid') + cookieUrlPart;	
	}
	
	// Build iFrame
	$('#insert-iframe').append('<iframe id="formIframe" frameborder="0" scrolling="no" allowtransparency />'); 
	$('#formIframe').attr('src', completeUrl);		
	
}






// ------------------------------------------------------------------------------------------------
// Document Ready
// ------------------------------------------------------------------------------------------------
$(function() {

// Alle variabelen in de config van het object zetten?

	// ------------------------------------------------------------------------------------------------
	// Set vars
	// Store DOM elements who are called more than once in a var starting with $
	// ------------------------------------------------------------------------------------------------
	var playedMovie01 = false,
		playedMovie02 = false,
		playedMovie03 = false,
		
		$lightbox = $('#lightbox'),
		$startvideo1 = $("img#start-video-1"),
		$startvideo2 = $("img#start-video-2"),
		$startvideo3 = $("img#start-video-3");
	
	
	
	// ------------------------------------------------------------------------------------------------
	// Validate form value
	// ------------------------------------------------------------------------------------------------
	
	function validateFormValue(valVraag) {
		$message.hide();
		
		if ($.cookie(valVraag) === null) {
			$message.show();
		} else {
			return true;	
		}
	}

	// ------------------------------------------------------------------------------------------------
	// Call Functions
	// ------------------------------------------------------------------------------------------------
	// Get Mail Id from Url to add to iframe url
	getUrlVariables();
	
	// Check for cookie values and set values to questions
	readCookie();
		
	// ------------------------------------------------------------------------------------------------
	// Set Main Click Events
	// ------------------------------------------------------------------------------------------------
	
	//page.event({ 'test' : 'h2' });

	
	var $btnhome = $('#btn-home'), 
		$btnstart = $('#btn-start'), 
		$page03navBtnprev = $('#page-03-nav .btn-prev'),
		$page04navBtnprev = $('#page-04-nav .btn-prev'),
		$message = $('p.message'),
		$page = $('.page'),
		$page02 = $('#page-02'),
		$page03 = $('#page-03'),
		$page04 = $('#page-04'),
		$page05 = $('#page-05'),
		$pagenav = $('.page-nav'),
		$page02nav = $('#page-02-nav'),
		$page03nav = $('#page-03-nav')
	
	//var arrElements = [ $btnhome, $page03navBtnprev ];
	//var arrHide = [ $message, $btnhome, $page, $pagenav ];
	//var arrShow = [ $page02, $page02nav ];
	
	var arrElements = [ $btnstart, $page04navBtnprev ];
	var arrHide = [ $message, $page, $pagenav ];
	var arrShow = [ $page03, $page03nav ];
	
	//console.log('arrElements: ' + arrElements);
	// Initialize pages
	page.init($page02, arrElements, arrShow, arrHide);


	//page.event($setclick);
	//page.event('#btn-home, #page-03-nav .btn-prev', 'p.message, #btn-home, .page, .page-nav' , '#page-02, #page-02-nav');
	//page.event([arrElements, arrHide, arrShow]);
	//page.event('.btn-start', 'p.message', '');
	//page.event([$btnstart, $page04navBtnprev], [$message, $page, $pagenav], [$page03, $btnhome, $page03nav]);
	



	 //$('#page-02').show();
	
	/*
	$('#btn-home, #page-03-nav .btn-prev').click(function(event) {
		// Toon Uitleg page
		event.preventDefault();
		$('p.message, #btn-home').hide();
		$('.page').hide();
		$('.page-nav').hide();
		$('#page-02').show();
		$('#page-02-nav').show();
	});
	*/
	/*
	$('.btn-start, #page-04-nav .btn-prev').click(function(event) {
		// Toon Vraag 1 page
		event.preventDefault();
		$('p.message').hide();
		$('.page').hide();
		$('.page-nav').hide();
		$('#page-03, #btn-home').show();
		$('#page-03-nav').show();
		
		//Show movie if not already auto played
		if(!playedMovie01) {
			$("img#start-video-1").click();
			playedMovie01 = true;
		}
	});
	*/
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
	$startvideo1.click(function(){
		//basicVideoSetup('http://dl1.streamzilla.jet-stream.nl/bitsquad/Xenpax/where.mp4');
	});
	
	$startvideo2.click(function(){
		//basicVideoSetup('http://dl1.streamzilla.jet-stream.nl/bitsquad/Xenpax/what.mp4');
	});
	
	$startvideo3.click(function(){
		//basicVideoSetup('http://dl1.streamzilla.jet-stream.nl/bitsquad/Xenpax/who.mp4');
	});
	
	// Close layer
	$("#close-video").click(function(){
		jwplayer("movie-player").stop();
		$lightbox.hide();
	});
		
	
	
});

