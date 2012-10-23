
function runQuery(){ 
            
     $("#loading").ajaxStart(function(){ 
        $(this).show();
     });
      
     $("#loading").ajaxComplete(function(){ 
										 
			$(this).hide();
			
			$("#flipCont").show();
			
			// ------------------------- KOEN
			
			// remove alle links waarvan de url al een keer voor komt ----> Desciption: collectUrls is an object which maps any previously seen Urls to true. It functions as a set containing all previously seen Urls. The line if (collectUrls[txt]) checks to see if the text is in the set. If so, we've seen this Url before, so we remove the link. Otherwise, this is a Url we see for the first time. We add it to the set so that any further links with the same Url be removed.
			var collectUrls = {};
		
			$('#results a').each(function() { 
				var txt = $(this).attr("href"); 
				if (collectUrls[txt]) 
					$(this).remove(); 
				else 
					collectUrls[txt] = true; 
			});
               
			var numRand = 1;
			var getRandomChild = "";
			

			// Create empty object to store random numbers used in view
			// Example when filled: var usedNumbers = { 12:true, 3:true, 5:true, 1:true };
			var usedNumbers = {}; 
			
			// Function for counting number of items in object
			function countObject(obj) { 
				var count = 0; 
				for(var prop in obj) { 
					count++; 
				} 
				return count; 
			}
			
			// Get ammount of results
			resultsCount = $('#results a').size();

			// If resultsCount is larger than the max of 6, just set it to 6
			if (resultsCount > 6){
			    resultsCount = 6;
			}
			// To prevent endless loop
			if (resultsCount == 0){
			    
			    $('#results_alt a').appendTo('#results');  
			    resultsCount = 6;
			}
			var linksShown = $("#results a").size() + 1;
	
			function getRandumNumber() {
			    
			    // Zort ervoor dat er geen double images getoond worden in de 6 flip boxes
			    // !!! Werkt niet als timing niet gelijk is van de flip boxes
	
				// Get random number
				numRand = Math.floor(Math.random()*linksShown);
                
				if(numRand == 0){
					// If random number == 0 then create another random number
					getRandumNumber();
				} else {
					// de 4 nog dynamisch maken, afhangkelijk van het aantal getoonde items ???
					if(countObject(usedNumbers) == resultsCount) {
						// if usedNumbers == resultsCount then empty object
						usedNumbers = {};
					}
					// Check of number is already stored in object
					if (usedNumbers[numRand]) {
						// If so create another random number
						getRandumNumber();
					} else { 
						// Store number in object
						usedNumbers[numRand] = true; 
					}
					return numRand;
				}
				
				

			}
			
								   // Set first images, ater these it's the 10s refresh
								   
								   $("#results a:nth-child(1)").clone().appendTo("#flip01");
								   $("#results a:nth-child(2)").clone().appendTo("#flip02");
								   $("#results a:nth-child(3)").clone().appendTo("#flip03");
								   $("#results a:nth-child(4)").clone().appendTo("#flip04");
								   $("#results a:nth-child(5)").clone().appendTo("#flip05");
								   $("#results a:nth-child(6)").clone().appendTo("#flip06");
								   
								   
								   // http://jquery.offput.ca/every/
									$("#timer").everyTime("8s",function(i) {
											
										getRandumNumber();
										
										getRandomChild = "#results a:nth-child(" + numRand + ")";			
										
										$("#flip01").html("");
										
										$("#flip01").flip({
											direction:'tb',
											speed: 200,
											onBefore: function(){
												$($(getRandomChild).clone().appendTo("#flip01"));
											}
										})
													
									});
									
									
											
											
											
									$("#timer").everyTime("10s",function(i) {
																	
										
										getRandumNumber();
										
										getRandomChild2 = "#results a:nth-child(" + numRand + ")";
										
										$("#flip02").html("");
										
										
										$("#flip02").flip({
											direction:'bt',
											speed: 200,
											onBefore: function(){
												$($(getRandomChild2).clone().appendTo("#flip02"));
											}
										})
										
									});
									
									
									$("#timer").everyTime("12s",function(i) {
																	
										
										getRandumNumber();
										
										getRandomChild3 = "#results a:nth-child(" + numRand+ ")";
										
										
										$("#flip03").html("");
										
										
										$("#flip03").flip({
											direction:'lr',
											speed: 200,
											onBefore: function(){
												$($(getRandomChild3).clone().appendTo("#flip03"));
											}
										})
										
									});
									
									
									$("#timer").everyTime("9s",function(i) {
																				
										getRandumNumber();
										
										getRandomChild4 = "#results a:nth-child(" + numRand + ")";			
										
										$("#flip04").html("");
													
										$("#flip04").flip({
											direction:'rl',
											speed: 200,
											onBefore: function(){
												$($(getRandomChild4).clone().appendTo("#flip04"));
											}
										})
									});
									
									$("#timer").everyTime("11s",function(i) {
																				
										getRandumNumber();
										
										getRandomChild5 = "#results a:nth-child(" + numRand + ")";			
										
										$("#flip05").html("");
													
										$("#flip05").flip({
											direction:'rl',
											speed: 200,
											onBefore: function(){
												$($(getRandomChild5).clone().appendTo("#flip05"));
											}
										})
									});
									
									$("#timer").everyTime("13s",function(i) {
																				
										getRandumNumber();
										
										getRandomChild6 = "#results a:nth-child(" + numRand + ")";			
										
										$("#flip06").html("");
													
										$("#flip06").flip({
											direction:'rl',
											speed: 200,
											onBefore: function(){
												$($(getRandomChild6).clone().appendTo("#flip06"));
											}
										})
									});
									
								

	
			// ------------------------- END KOEN

	}); // End ajaxComplete
	
	
	
	
	
	
 
 	
 	// http://dev.twitter.com/doc/get/search
	//var setQuery = "http://search.twitter.com/search.json?lang=nl&q=yfrog.com OR twitpic.com OR img.ly OR moby.to OR twitgoo.com OR plixi.com + "+query+"&rpp="+results+"&callback=?"
	// var setQuery = "D:\Inetpub\Websites (live)\BitSquad\nachtnetbrabant.nl\_content"
    var setQuery = "http://www.nachtnetbrabant.nl/content/search.json"
   
    
    $.getJSON(setQuery, function(json){ 
            
            $("#results").text("");     
            
            if(json.results.length == 0) 
            { 
                // Load alternative backup images
                
                $('#results_alt a').appendTo('#results');   
            } 
            
            $.each(json.results, function(i, val) { 
	
	        //we have to check if an image actually is found in the search 
            //if not we skip this entry 
			var imageRegEx = /(http:\/\/(www.|)+(moby.to|twitpic.com|img.ly|yfrog.com|twitgoo.com|plixi.com\/p)\/){1}[a-zA-Z0-9]{1,}/g; 
            
            if(val.text.search(imageRegEx) !== -1) 
            { 
            imgFind = val.text.match(imageRegEx);     
            var tweet = "<p class='words'>"+val.text+"</p>"; 
             
                for(i=0; i<imgFind.length; i++) 
                { 
                    ajaxImgId = i; 
					
					if(imgFind[i].indexOf("http://moby.to/") > -1) 
                    { 
                        tweet = tweet.replace(imgFind[i], ""); 
                        //imgId = imgFind[i].substr(15); 
                        srcLink = imgFind[i];
						// api key zelf aanvragen, meer info: http://developers.mobypicture.com/documentation/1-0/getthumb/
                        src = "http://api.mobypicture.com?t="+imgFind[i]+"&s=small&k=S1D9iCak8QFSQqvo&format=plain";
                        imgSource = "moby.to"; 
                    }		  
					if(imgFind[i].indexOf("http://twitgoo.com/") > -1) 
                    { 
                        tweet = tweet.replace(imgFind[i], ""); 
                        imgId = imgFind[i].substr(19); 
                        srcLink = imgFind[i];
                        src = "http://twitgoo.com/show/thumb/"+imgId; 
                        imgSource = "twitgoo.com"; 
                    } 
					
					if(imgFind[i].indexOf("http://plixi.com/") > -1) 
                    { 
                        tweet = tweet.replace(imgFind[i], ""); 
                        imgId = imgFind[i].substr(17); 
                        srcLink = imgFind[i];
                        src = "http://api.plixi.com/api/tpapi.svc/imagefromurl?size=small&url=http://plixi.com/"+imgId; 
                        imgSource = "plixi.com"; 
                    } 
					
                    if(imgFind[i].indexOf("http://twitpic.com/") > -1) 
                    { 
                        tweet = tweet.replace(imgFind[i], ""); 
                        imgId = imgFind[i].substr(19); 
                        srcLink = imgFind[i]; 
                        src = "http://twitpic.com/show/thumb/"+imgId; 
                        imgSource = "twitpic.com"; 
                    } 
                    if(imgFind[i].indexOf("http://www.twitpic.com/") > -1) 
                    { 
                        tweet = tweet.replace(imgFind[i], ""); 
                        imgId = imgFind[i].substr(23); 
                        srcLink = imgFind[i]; 
                        src = "http://twitpic.com/show/thumb/"+imgId; 
                        imgSource = "twitpic.com"; 
                    } 
                    if(imgFind[i].indexOf("http://img.ly/") > -1) 
                    { 
                        tweet = tweet.replace(imgFind[i], ""); 
                        imgId = imgFind[i].substr(14); 
                        srcLink = imgFind[i]; 
                        src = "http://img.ly/show/thumb/"+imgId; 
                        var imgSource = "img.ly"; 
                    } 
                    if(imgFind[i].indexOf("http://yfrog.com/") > -1 || imgFind[i].indexOf("http://www.yfrog.com/") > -1) 
                    { 
                        tweet = tweet.replace(imgFind[i], ""); 
                        srcLink = imgFind[i]; 
                        src = imgFind[i]+".th.jpg"; 
                        var imgSource = "yfrog.com"; 
                    } 
                } 
                
				var imageInput = '<a target="_blank" href="'+srcLink+'"><img src="'+src+'" /></a>' 	
                 
            }
            
            
            
            //we have to check if an image actually is found in the search 
            //if not we skip this entry 
            if(val.text.search(imageRegEx) !== -1) 
            { 
                $("#results").append(imageInput); 
            }
			
            });
            
 
    }); 
         
} 
  

$(document).ready(function(){ 

	//var results = 50;
	//var query = "%23nachtnetbrabant" // = #3fm

	runQuery(); 
	
	
	//setup some style things 
    $("#loading").css("opacity", "0"); 
    $("#results").css("display", "none"); 
 	
});