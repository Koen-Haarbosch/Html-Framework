//http://www.rebeccamurphey.com/jsmag/object-literal/
//http://www.rebeccamurphey.com/jsmag/object-literal/js/object-literal.js
//http://rmurphey.com/blog/2009/10/15/using-objects-to-organize-your-code/

//http://c.fzilla.com/1291523190-jpaginate.js

					/*
					var config = { 
						container : '#content',
						items : 6,
						previous : 'Vorige',
						next : 'Volgende',
						paginationclass : 'pagination'
					}
					function Paging() {}
					Paging.prototype = config;
					
					var paging = new Paging();
					
					console.log(paging.container);
					console.log(paging.items);
					console.log(paging.previous);
					console.log(paging.next);
					console.log(paging.paginationclass);
					
					paging.items = 4;
					
					console.log(paging.items);
					*/

// Create a simple photobook from a custom json feed

var data = 
{
	base: 'http://www.google.nl/images/',
	categories: [
		{
			categorie: 'Mooie fotos',
			photos: [
				{
					url: 'photo01.jpg',
					name: 'Question one in section one?',
					publisher: 'Naam fotograaf'
				},
				{
					url: 'photo01.jpg',
					name: 'Question one in section one?',
					publisher: 'Naam fotograaf'
				}
		]
	},
	{
		categorie: 'Lelijke fotos',
		photos: [
				{
					url: 'photo01.jpg',
					name: 'Question one in section one?',
					publisher: 'Naam fotograaf'
				},
				{
					url: 'photo01.jpg',
					name: 'Question one in section one?',
					publisher: 'Naam fotograaf'
				}
	]
}
]		
};

//console.log(data.categories[1].categorie);

// loop true json in photobook object
// and creat in this loop a new photo() for each foto
// pass the photo data to this object's config
$.each (data, function (item) {
    console.log (item); // get first children of object
   	console.log (data[item]); // get values of first children
    console.log (data[item].photos);
});

// photobook
	// container-id
	// data-url
	// has sections
	//	sections (days / categories / ...)
		// name
		// photos
		//	click function to show this category
		// (has pages) --> later
		//	photos
			// url
			// name
			// publisher
//	section navigation
//	section paging


// build with mustage template --> niet echt toegangkelijk maar voor de oefening --> template later pas inbouwen
// require mustache template
// popop in fancybox

var photobook = {
	'config' : { 
		container : $('#content'),
		dataurl : 'http://www.linktotdata.nl'
	},
    'init' : function(config) { 
		// provide for custom configuration via init()
		if (config && typeof(config) == 'object') {
			$.extend(photobook.config, config);
		}
		
		photobook.$container = photobook.config.container;
		console.log(photobook.$container);
		
		photobook.$sections = photobook.$container.
        // only select immediate children!
        find('p');
		
		photobook.numberOfItems = $(photobook.$container).children().size();
		console.log(photobook.numberOfItems);
		
		photobook.numberOfPages = Math.ceil(photobook.numberOfItems/photobook.config.items);
		console.log(photobook.numberOfPages);
		
		// call buildPageNav
		photobook.buildPageNav(photobook.$sections);
		
		
	// add html for paging
	
	
	
	
		photobook.initialized = true;
	},
    'buildPageNav' : function($sections) { 
		console.log('enter buildPageNav');
		//console.log(photobook.numberOfPages);
		// iterate over the provided list of sections
		$sections.each(function() {
	
			// get the section
			var $section = $(this);
			$($section).click(photobook.showSection);
		});
	
	},
    'showSection' : function() { 
		console.log('clicked p');
	}
	
};
