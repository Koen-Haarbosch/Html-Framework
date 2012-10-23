var pagedata = 
{
	'Pages': 
	[
		{
			'PageId': '01',
			'PageTitle': 'Pagine 1',
			'PageContent': 'Tekst pagina 1 <strong>Bold tekst</strong>'
			
		},
		{
			'PageId': '02',
			'PageTitle': 'Pagine 2',
			'PageContent': 'Tekst pagina 2'
		},
		{
			'PageId': '03',
			'PageTitle': 'Pagine 3',
			'PageContent': 'Tekst pagina 3'
		}
	]		
};

	

// ------------------------------------------------------------------------------------------------
// Document Ready
// ------------------------------------------------------------------------------------------------
$(function() {
		   
   	// Wensen:
	// html in page uit template halen
	// content per pagina pushen in template html
	// afwijkingen per pagina mogelijk maken, hoe? Misschien door overerving van basis page en toevoegen/ overrulen standaard functionaliteit. Dus prototype?
	// history/ BBQ plugin eraan koppelen
	// = html opmaak in json mogelijk?

	// basic init
	page.init();
	// Overide with custom params
	//page.init({ 'prevText' : 'De vorige pagina' });
	
	
	var page02 = {
		'config' : { 
			'container' : $('#page-02')
		},
		
		'init' : function(config) {
			if (config && typeof(config) == 'object') {
				$.extend(page.config, config);
			}
			
			page02.$container = page02.config.container;
			
			page02.afwijkingen();
			page02.showVideo(page02.$container);
		},
		
		'afwijkingen' : function() {
			page02.$container = page02.config.container;
			
			$(page02.$container).append('Extra tekst');		

		},
		
		'showVideo' : function($links) { 
			var $li = $(this);
	
			$($links).find('span.next').
				click(page.showVideo);
				
			// Set click behaviour for previous link
			if($li.hasClass('prev')){
				$section.prev().addClass('current').
				siblings().removeClass('current');		
			}
			// Set click behaviour for next link
			if($li.hasClass('next')){
				$section.next().addClass('current').
				siblings().removeClass('current');		
			}
			
	
		}
	};
	
	//var newPage = $.extend({}, page, page02);
	
	page02.init({ 'prevText' : 'De vorige pagina' });
	//console.log(newPage.config.prevText)
	
});

