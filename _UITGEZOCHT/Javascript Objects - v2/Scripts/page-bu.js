var page = {
    'config' : {
        //wrapper : '#myFeature',
        //container : 'div',
        //urlBase : 'foo.php?item='
    },

    'init' : function(page2,clicks2,show2,hide2) {
		$('#page-02').show();
        console.log(page2);
		console.log(clicks2);
		console.log(show2);
		console.log(hide2);
		$.each(clicks2, function(index, value) {
			//console.log('each: ' + value);
			page.events(value, show2, hide2);
		});
		/*
		$.each(show2, function(index, value) {
			page.show(value);
		});
		$.each(hide2, function(index, value) {
			page.hide(value);
		});
		*/
		
    },
	
    'events' : function(clickelement, showelement, hideelement) {
			console.log('elements: ' + clickelement);
			console.log('showelement: ' + showelement);
			console.log('hideelement: ' + hideelement);
			
			$(clickelement).click(function(event) {
					event.preventDefault();
					console.log('test');
					page.hide(hideelement);
					page.show(showelement);
			});

			
    },
	
	'hide' : function($hideElements) {
		console.log('hide: ' + this);
				$(this).hide();
    },

    'show' : function($showElements) {
		console.log('show: ' + this);
			  	$(this).show();
    }
	
};
