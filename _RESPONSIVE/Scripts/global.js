// ------------------------------------------------------------------------------------------------
// Example
// ------------------------------------------------------------------------------------------------
// _var1:			explain _var1
// _var2:			explain _var2
// _var3:			explain _var3
// $var4:			Gebruik een $ vooraf als je een DOM object ophaalt

function example(_var1,_var2,_var3) {

} // end: Example



// ------------------------------------------------------------------------------------------------
// Fontsize
// ------------------------------------------------------------------------------------------------
$.fn.fontSize = function() {
	// Set events
	$.each(['txt-size-01', 'txt-size-02', 'txt-size-03'], function(i, v) {
		$("." + v).click(function(event) {
			event.preventDefault();
			$("body").removeClass();
			$.cookie("fontSize", v, { path: '/', expires: -1 });
			if (v != 'txt-size-01') {
				$("body").addClass(v);
			}
			return false;
		});
	});
	// Read cookie
	var val = $.cookie("fontSize");
	if (val && (val != '') && (val != 'txt-size-01')) {
		$("body").addClass(val);
	}
} // end: Fontsize


// ------------------------------------------------------------------------------------------------
// Toggle input value
// ------------------------------------------------------------------------------------------------
$.fn.toggleVal = function() {
    return this.focus(function() {
        if (this.value == this.defaultValue) {
            this.value = "";
        }
    }).blur(function() {
        if (!this.value.length) {
            this.value = this.defaultValue;
        }
    });
}; // end: Toggle input value


// ------------------------------------------------------------------------------------------------
// Tooltips
// ------------------------------------------------------------------------------------------------
$.fn.tooltip = function() {
    xOffset = -20;
    yOffset = 0;
    $("a.tooltip").hover(function(e) {
            this.t = this.title;
            this.title = "";
            $("body").append("<p id='tooltip'>" + this.t + "</p>");
            $("#tooltip")
			.css("top", (e.pageY - xOffset) + "px")
			.css("left", (e.pageX + yOffset) + "px")
			.fadeIn("fast");
    },
	function() {
	    this.title = this.t;
	    $("#tooltip").remove();
	});
    $("a.tooltip").mousemove(function(e) {
        $("#tooltip")
			.css("top", (e.pageY - xOffset) + "px")
			.css("left", (e.pageX + yOffset) + "px");
    });
};  // end: Tooltip
	
	

	
// ------------------------------------------------------------------------------------------------
// Hide or Activate IMG tags (responsive webdesign)
// ------------------------------------------------------------------------------------------------
// DISABLE LOADING OF ALL HIDDEN IMAGES
function disableImgLoad() {
	var images = $('img'); 
	$.each(images, function() {								// check all img tags
		if($(this).is(':hidden')){							// is img hidden?
			$(this).attr('rel', $(this).attr('src'))		//	 then put src in rel
			$(this).removeAttr('src');						//	 and remove src
		}
	}); 
} // end:disableImgLoad

// ACTIVATE ALL 'MADE VISIBLE' IMAGES
function reactivateImgLoad() {
	var images = $('img'); 
	$.each(images, function() {								// check all img tags
		if($(this).is(':visible') && $(this).attr('rel') ){	// is img visible and rel filled?
			$(this).attr('src', $(this).attr('rel'))		//	 then put rel in src
			$(this).removeAttr('rel');						//	 and remove rel
		}
	}); 
} // end:reactivateImgLoad

$(function() { disableImgLoad(); });					// Hide hidden IMG tags (responsive web)
$(window).resize(function() { reactivateImgLoad(); });	// Activate hidden IMG tags on window visible/resize (responsive web)




// ------------------------------------------------------------------------------------------------
// Document Ready
// ------------------------------------------------------------------------------------------------
$(function() {
						   
	// Activate layout miniplugins
    // $('html').fontSize();
    $('html').tooltip();
    $('.togval').toggleVal();

	
	
	
	// Suckerfish
    $("ul.horizontal li").hover(
        function() { $(this).addClass("hover"); },
        function() { $(this).removeClass("hover"); }
    );
	
	// Check window width and act to it
	
		$('span.more').click(function() {
		  $('.second').show();
		});

		if ($(window).width()> 768 && $(window).width()< 991) {
			console.log('Tablet Layout');
			$('#extra-content').load('external-content.html #article2');
		}
		if ($(window).width()< 480) {
			//console.log('Mobile Layout');
			
		}
		if ($(window).width()> 480 && $(window).width()< 767) {
			//console.log('Wide Mobile Layout');
		}
		else  {
			$('#extra-content').load('external-content.html #article');
		}

});