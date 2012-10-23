//http://www.rebeccamurphey.com/jsmag/object-literal/
//http://www.rebeccamurphey.com/jsmag/object-literal/js/object-literal.js

var page = {
    'config' : { 
		'container' : $('#wrapper'),
		'prevText' : 'Vorige',
		'nextText' : 'Volgende',
		'contentUrl' : '/content/test.xml'
	},

    'init' : function(config) {
        if (config && typeof(config) == 'object') {
			$.extend(page.config, config);
		}

		page.$container = page.config.container;
		
		// Load JSON data
		/*
		var reqJson = $.ajax('../pages.json', {
			dataType : 'json' 					 
		});
		
		reqJson.success ( function(resp){
			console.log(resp);
			var template = $('#page-template').html();

			var html = Mustache.to_html(template, resp);
			$(page.$container).html(html);
			}
			
		);
		
		reqJson.error ( function(resp){
			console.log('error');
			console.log(resp);
			}
			
		);
		*/
		
		
		
		// Load Html template
		// change into loading form external HTML file 
		var template = $('#page-template').html();

		var html = Mustache.to_html(template, pagedata);
		$(page.$container).html(html);
	
		page.$sections = page.$container.
			find('div.page'); 
		page.buildPageNav(page.$sections);
		
		//page.$sections.find('div.page-nav a:first').click();
		$('.page:first-child').addClass('current');
		
		page.initialized = true;
		
    },
	
	'buildPageNav' : function($sections) {

		$sections.each(function() {

			var $section = $(this);		
			var $pagenav = $section.find('div.page-nav');
			// Build the Previous link
			$($pagenav).find('span.prev').
				text(page.config.prevText).
				data('section', $section).
				click(page.showSection);
			// Build the next link
			$($pagenav).find('span.next').
				text(page.config.nextText).
				data('section', $section).
				click(page.showSection);
				
		});

	},

	'showSection' : function() { 
		var $li = $(this);

		var $section = $li.data('section');
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
