//
// Carousel
// --------------------------------------------------

;(function(){
	'use strict';

	var ar = [];
	var parent  = 		document.getElementsByClassName("carousel-slides")[0];
	var self = 			parent.getElementsByClassName("carousel-slide");
	var self_qts =		self.length;
	var self_width = 	self[0].offsetWidth;

	var indicators =	document.querySelectorAll("[data-indicator]");

	//Create Array
	for(var n=0; n<self_qts; n++) {
		
		if( n == 0 ) {
			ar.push(0);
		}

		else if( n == 1 ) {
			ar.push( self_width );
		}

		else {
			ar.push( self_width*n );	
		}
	}
	n = 0;
	

	
	//Click Indicator
	for(var n=0; n<indicators.length; n++) {
		
		indicators[n].addEventListener("click", function(){			
			//console.log( this.getAttribute("data-indicator") )
		}, false);
	}


}());