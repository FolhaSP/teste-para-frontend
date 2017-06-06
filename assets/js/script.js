$(function () {
  
  	$(".scroll-top a").click(function(event){
		event.preventDefault();
		$('html,body').animate({
			scrollTop: $(this.hash).offset().top
		}, 800); 
	});


	$('#banner-top').slick({
		slide: '.item',
		autoplay: true,
		arrows: true,
		dots: true,
		responsive: [
				{
				breakpoint: 768,
					settings: {
						arrows: false
					}
				}
			]
	});

});