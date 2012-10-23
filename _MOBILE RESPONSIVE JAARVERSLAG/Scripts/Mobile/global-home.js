// ------------------------------------------------------------------------------------------------
// Document Ready
// ------------------------------------------------------------------------------------------------
$(function() {

});







































// ------------------------------------------------------------------------------------------------
// Video Player : Homepage
// ------------------------------------------------------------------------------------------------
function basicVideoSetup(setWidth, setHeight){
	jwplayer("movie-player").setup({
		flashplayer: "Video/player.swf",
		icons: false,
		height: setHeight,
		width: setWidth,
		autostart: true,
		allowfullscreen: false,
		controlbar: "bottom",
		file: 'http://download.media.dutchview.nl/rabobank/20110303-jaarcijfers/mobiel/moerland/moerland-nl.mp4'
	});
}

// ------------------------------------------------------------------------------------------------
// Window Load
// ------------------------------------------------------------------------------------------------

$(window).load(function() {
	$('.flexslider').flexslider({
			 animation: "slide"
	});
});


// ------------------------------------------------------------------------------------------------
// Document Ready
// ------------------------------------------------------------------------------------------------
$(function() {
    
	// ------------------------------------------------------------------------------------------------
	// Twitter : get latest Twitter feed(s)
	// ------------------------------------------------------------------------------------------------
	
	//twitterSlide();
	/*
	$('#twitter').jTweetsAnywhere({
		searchParams: ['q=html5'],
		count: 2,
		showTweetFeed: {
			showTimestamp: {
				refreshInterval: 15
			},
			autorefresh: {
				mode: 'trigger-insert',
				interval: 30
			},
			paging: { mode: 'more' }
		},
		onDataRequestHandler: function(stats, options) {
			if (stats.dataRequestCount < 11) {
				return true;
			}
			else {
				stopAutorefresh(options);
				alert("To avoid struggling with Twitter's rate limit, we stop loading data after 10 API calls.");
			}
		}

	});
	*/
	// end: Twitter
    
	// ------------------------------------------------------------------------------------------------
	// Video Player : Homepage
	// ------------------------------------------------------------------------------------------------
	
	// set video player in different size based on screen size  
	if ($(window).width() <= 480) {
		basicVideoSetup(290, 163);
	} else {
		basicVideoSetup(488, 275);
	}
	
	/*
	$("a.video-link").click(function (event) {
		event.preventDefault();
		jwplayer("movie-player").stop();
		var getVideoLink = "";
		var getImageLink = "";
		getVideoLink = $(this).attr("rel");
		getImageLink = $(this).attr("href");
		jwplayer("movie-player").load({file: getVideoLink, image: getImageLink});
    });
	*/
	// end: Video Player
	

});