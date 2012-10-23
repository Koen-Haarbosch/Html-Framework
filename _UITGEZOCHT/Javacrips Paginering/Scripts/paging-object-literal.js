//http://www.rebeccamurphey.com/jsmag/object-literal/
//http://www.rebeccamurphey.com/jsmag/object-literal/js/object-literal.js
//http://rmurphey.com/blog/2009/10/15/using-objects-to-organize-your-code/

//http://c.fzilla.com/1291523190-jpaginate.js

var fbPaging = {
    config : { 
		container : '#content',
		items : 6,
		previous : 'Vorige',
		next : 'Volgende',
		paginationclass : 'pagination'
	},

    init : function(config) {
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
	
	buildPageNav : function($sections) {

	},

	showSection : function() { 

	}
	
};
