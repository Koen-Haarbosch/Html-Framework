$(document).ready(function() {   
 
		// START Dynamisch inladen html content uit externe bestanden
		
		// http://yensdesign.com/2008/12/how-to-load-content-via-ajax-in-jquery/
		
		// References
		var sections = $("nav li");
		var loading = $("#loading");
		var content = $("#content");
		
		// Manage click events
		sections.click(function(){
			//show the loading bar
			showLoading();
			//load selected section
			switch(this.id){
				case "home":
					content.slideUp();
					content.load("sections.html #section_home", hideLoading);
					content.slideDown();
					break;
				case "clients":
					content.slideUp();
					content.load("sections.html #section_clients", hideLoading);
					content.slideDown();
					break;
				case "work":
					content.slideUp();
					content.load("sections.html #section_work", hideLoading);
					content.slideDown();
					break;
				case "contact":
					content.slideUp();
					content.load("external.html", hideLoading);
					content.slideDown();
					break;
				default:
					//hide loading bar if there is no selected section
					hideLoading();
					break;
			}
		});
	
		//show loading bar
		function showLoading(){
			loading
				.css({visibility:"visible"})
				.css({opacity:"1"})
				.css({display:"block"})
			;
		}
		//hide loading bar
		function hideLoading(){
			loading.fadeTo(1000, 0);
		};


		
});















