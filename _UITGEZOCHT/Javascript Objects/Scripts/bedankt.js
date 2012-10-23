// ------------------------------------------------------------------------------------------------
// Build Score Page from Cookies
// ------------------------------------------------------------------------------------------------

function buildResults() {
		
	// Show answers from Cookie in html
	$("#score-01 .jullie-antwoord").append($.cookie('vraag1'));
	$("#score-02 .jullie-antwoord").append($.cookie('vraag2'));
	$("#score-03 .jullie-antwoord").append($.cookie('vraag3'));
	
	// Hide good/bad span
	$(".goed").hide();
	$(".fout").hide();
	
	// Show correct good/bad span according to answer
	if($.cookie('vraag1')=== "C"){
		// vraag 1
		$("#score-01 .goed").show();
	} else {
		$("#score-01 .fout").show();
	}
	
	if($.cookie('vraag2')=== "B"){
		// vraag 2
		$("#score-02 .goed").show();
	} else {
		$("#score-02 .fout").show();
	}
	
	if($.cookie('vraag3')=== "C"){
		// vraag 3
		$("#score-03 .goed").show();
	} else {
		$("#score-03 .fout").show();
	}

}


	

// ------------------------------------------------------------------------------------------------
// Document Ready
// ------------------------------------------------------------------------------------------------
$(function() {
	
	// Hide Back button on parent page
	window.parent.$('#page-06-nav').hide();
	
	// Set new height form iframe in parent 
	window.parent.$('#formIframe').css('height','450px');
	
	buildResults();	
	
});

