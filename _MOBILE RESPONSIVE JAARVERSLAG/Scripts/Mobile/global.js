// ------------------------------------------------------------------------------------------------
// Get Value for swipe animation Panes
// ------------------------------------------------------------------------------------------------
function setLeft() {
	var newLeft = 0;

	if ($("html").hasClass('tablet-portrait')) {
		newLeft = 494;
	}
	if ($("html").hasClass('tablet-landscape')) {
		newLeft = 741;
	}
	if ($("html").hasClass('mobile-portrait')) {
		newLeft = 460;
	}
	return newLeft;
}
// ------------------------------------------------------------------------------------------------
// Configure/Bind jQuery Mobile
// ------------------------------------------------------------------------------------------------

$(document).bind("mobileinit", function(){
  //apply overrides here
  $.mobile.autoInitializePage = false;
});

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

	// ------------------------------------------------------------------------------------------------
	// Easy slider Downloads Homepage
	// ------------------------------------------------------------------------------------------------
	$("#slider").easySlider({
		prevId: 'prevBtn1',
		prevText: '',
		nextId: 'nextBtn1',
		nextText: '',
		auto: false,
		continuous: true
	});


/*
	// ------------------------------------------------------------------------------------------------
	// Swipe for main panes
	// ------------------------------------------------------------------------------------------------

	// SWIPE LEFT EVENT
    // Triggers when a swipe event occurred moving in the left direction.
    // Triggers when a horizontal drag of 30px or more (and less than 20px vertically) occurs within 1 second duration.
    // A standard 'swipe' can be used to trigger event regardless of direction
    $(".p-cont").bind('swipeleft',function(event, ui){

		var testt = setLeft();
		var paneContainerLeft = parseInt($("#container").css("left"));
		var paneContainerNewLeft = paneContainerLeft - testt;

		$("#container").animate({
			left: paneContainerNewLeft
		}, 1000, function() {
			//
		});

    })
    // SWIPE RIGHT EVENT
    // Triggers when a swipe event occurred moving in the right direction.
    $(".p-cont").bind('swiperight',function(event, ui){

		var testt2 = setLeft();
		var paneContainerLeft = parseInt($("#container").css("left"));
		var paneContainerNewLeft = paneContainerLeft + testt2;

		$("#container").animate({
			left: paneContainerNewLeft
		}, 1000, function() {
			//
		});

    })
*/

    
	// ------------------------------------------------------------------------------------------------
	// Act on Resizing
	// ------------------------------------------------------------------------------------------------

	$(window).resize(function() { // when resizing
		$('#container').attr('style','');
		resizing();
		//alert('test');
	});
    resizing(); // onload

    // ------------------------------------------------------------------------------------------------
    // Act on Resizing
    // ------------------------------------------------------------------------------------------------
    $(window).resize(function () { // when resizing
        resizing();
    });
    resizing(); // onload

    function resizing() {
        // Check window width and act to it
        if ($(window).width() > 800) {
            $("html").removeClass('mobile-portrait');
            $("html").removeClass('mobile-landscape');
            $("html").removeClass('tablet-portrait');
            $("html").addClass('tablet-landscape');
        } else if ($(window).width() > 600 && $(window).width() <= 800) {
            $("html").removeClass('mobile-portrait');
            $("html").removeClass('mobile-landscape');
            $("html").removeClass('tablet-landscape');
            $("html").addClass('tablet-portrait');
        } /* else if ($(window).width() > 321 && $(window).width() <= 600) {
            $("html").removeClass('mobile-portrait');
            $("html").removeClass('tablet-portrait');
            $("html").removeClass('tablet-landscape');
            $("html").addClass('mobile-landscape');
        } */
        else if ($(window).width() <= 600) {
            $("html").removeClass('tablet-portrait');
            $("html").removeClass('tablet-landscape');
            $("html").removeClass('mobile-landscape');
            $("html").addClass('mobile-portrait');

            if ($("body").hasClass('vervolg')) {
                // don't do anything
            } else {
                $("#banners-left").insertBefore("#banners-right");
            }
        }
        setLeft();
        // endIf
    } // end Resizing


});
