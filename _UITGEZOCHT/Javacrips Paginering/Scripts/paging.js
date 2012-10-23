//http://www.rebeccamurphey.com/jsmag/object-literal/
//http://www.rebeccamurphey.com/jsmag/object-literal/js/object-literal.js

//http://c.fzilla.com/1291523190-jpaginate.js
(function($){
    $.fn.fbPaging = function(options) {
        var config = {
            'container' : '#content',
			'items' : 6,
			'previous' : 'Vorige',
			'next' : 'Volgende',
			'paginationclass' : 'pagination'
        };
        var config = $.extend(config, options);
		
		return this.each(function() {
            // object is the selected pagination element list
            obj = $(this);
            // this is how you call the option passed in by plugin of items
            var show_per_page = config.items;
			//getting the amount of elements inside parent element
            var number_of_items = obj.children().size();
            //calculate the number of pages we are going to have
            var number_of_pages = Math.ceil(number_of_items/show_per_page);
			
			console.log(show_per_page);
			console.log(number_of_items);
			console.log(number_of_pages);
		})
		
		
		
		
	};
})(jQuery);
/*
var paging = {
    'config' : { 
		'container' : '#content',
		'items' : 6,
		'previous' : 'Vorige',
		'next' : 'Volgende',
		'paginationclass' : 'pagination'
	},

    'init' : function(config) {
        if (config && typeof(config) == 'object') {
			$.extend(paging.config, config);
		}
		
		paging.$container = paging.config.container;
		//console.log(paging.$container);
		paging.numberOfItems = $(paging.$container).children().size();
		//console.log(paging.numberOfItems);
		paging.numberOfPages = Math.ceil(paging.numberOfItems/paging.config.items);
		//console.log(paging.numberOfPages);
		paging.initialized = true;
		
    },
	
	'buildPageNav' : function($sections) {

	},

	'showSection' : function() { 

	}
	
};
*/