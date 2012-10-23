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
	
	
});