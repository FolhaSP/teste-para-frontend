jQuery(document).ready(function(){
    var btnGoToTop = jQuery('#fsp-footer-go-to-top-button');
    
    btnGoToTop.on('click', function(evt){
        evt.preventDefault();
        jQuery('html, body').stop().animate({scrollTop:0}, 600, 'linear');
    });
});