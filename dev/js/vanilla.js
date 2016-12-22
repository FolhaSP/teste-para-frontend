//
// Carousel
// --------------------------------------------------

/*

Example:

	carousel(
      	{
      	  "id":"# ID ELEMENT",      	  
      	  "time":" SECONDS "     	  
      	}      
      	);

*/



var carousel = function( ar_config ) {
	'use strict';


	//	Verify exists id in ar_config
	//
	if( !ar_config["id"] ) {
		console.warn("(( Warning Vanilla ))");
		console.error("Carousel without id");
		return false;
	}

	//	Removed spacing and hash
	//
	ar_config["id"] = ar_config["id"].replace(/(#| )/g, "");


	//	Verify element parent exists in document
	//
	if( !document.getElementById( ar_config["id"] ) ) {
		console.warn("(( Warning Vanilla ))");
		console.error("Element #" + ar_config["id"] + " not exists");
		return false;
	}	


	//	Config default
	//
	var config = {		
		"time": 	ar_config["time"]  || 5000
	};


	//	Variables
	//
	var ElParent 				= document.getElementById( ar_config["id"] );
	var ElSlides 				= ElParent.getElementsByClassName("carousel-slide"); //Array / Important!
	var ElParentIndicator		= ElParent.getElementsByClassName("carousel-indicators")[0];
	var ElParentArrows			= ElParent.getElementsByClassName("carousel-arrows")[0];
	var arWidthElements  		= [];
	var currentElement			= 0;
	var Interval 				= 0;
 
	var arrows_n				= 0;
	var touchstart_n			= 0;
	var touchend_n				= 0;

	
	//	Search all element width .carousel-slide
	//	Set all array widths
	//
	var setWidthElements = function() {
		var n 	= 0;
		var els = ElSlides;
		var ar 	= []; 
		
		for(; n < els.length; n++) {
			if( n > 0 ) {
				ar.push( -(els[n].offsetWidth * n) );
			}
			else {
				ar.push( els[n].offsetWidth * n );
			}
		}

		arWidthElements = ar; //	Variable private to global
	};


	//	Indicator active
	//
	var IndicatorActive = function ( ElOrder ) {		
		ElParentIndicator.getElementsByClassName("active")[0].classList.remove("active");
		ElParentIndicator.getElementsByClassName("btn-indicator")[ ElOrder ].classList.add("active");
	};



	//	Toggle Slides
	//
	var ToggleSlides = function ( order ) {
		var els = ElSlides;
		var current = currentElement;

		if( order == 'back' ) {			
			if( current == 0 ) {
				current = els.length-1;
			}
			else {
				current--;
			}
		}
		else if( order == 'next' ) {			
			if( current == els.length-1 ) {
				current = 0;
			}
			else {
				current++;
			}
		}
		else {
			current = 0;
		}
		
		currentElement = current; //	Variable private to global
		return current;
	};
	

	//	Application style-left all elements 
	//
	var setMoveElements = function( order ) {		
		var n 		= 0;
		var els 	= ElSlides;
		var ar 		= arWidthElements;
		var current = ToggleSlides( order );
		
		
		for(; n < els.length; n++) {
			els[n].style.left = ar[ current ] + 'px';
			IndicatorActive( current );
		}

		if ( Interval === null ){
			Interval = setInterval(function(){
				setMoveElements('next');
			}, config['time'] );
		}
	};


	//	Create buttons indicators
	//
	var createElementsIndicators = function () {
		var n 		=	0;
		var els 	= ElSlides;
		var button  = [];

		for(; n < els.length; n++) {
			button[n] = document.createElement("button");			

			if( n == 0 ) {
				button[n].setAttribute("class", "btn btn-indicator active");
			} else {
				button[n].setAttribute("class", "btn btn-indicator");				
			}

			ElParentIndicator.appendChild( button[n] );
		}
	};



	// Actions! #LoooL
	//
	createElementsIndicators(); //	Create elements indicators
	setWidthElements();			//	Get width all elements .slide and push array arWidthElements[]
	setMoveElements();			//	DOM. Mipulation style.left of element

	Interval = setInterval(function(){
		setMoveElements('next');
	}, config['time'] );




	//	Events
	//

	//	Click arrows
	for(; arrows_n < 2; arrows_n++) {
		ElParentArrows.querySelectorAll("[data-carousel-arrow]")[ arrows_n ].addEventListener("click", function(){

			clearInterval(Interval);
			Interval = null;
									
			if( this.getAttribute("data-carousel-arrow") == "left" ) {
				setMoveElements('back');				
			}

			if( this.getAttribute("data-carousel-arrow") == "right" ) {				
				setMoveElements('next');
			}

		}, false);
	}


	//Touches
	//	toouchstart
	ElParent.addEventListener("touchstart", function(){
		clearInterval(Interval);
		Interval = null;

		touchstart_n = event.touches[0].clientX;
	}, false);

	
	//	toouchend
	ElParent.addEventListener("touchend", function(){		
		touchend_n = event.changedTouches[0].clientX;

		if( touchstart_n < touchend_n ) { //Left			
			setMoveElements('back');			
		}
		else {			//Right
			setMoveElements('next');
		}

	}, false);



	// 	Window Event
	//		Detected change resolusion
	//			Modify array arWidthElements[]
	window.onresize = function () {
		clearInterval(Interval);
		Interval = null;
		
		setWidthElements();
		setMoveElements('next');
	};
};