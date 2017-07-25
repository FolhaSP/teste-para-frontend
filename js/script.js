$('.btn-subir').on('click', function(evento){
    evento.preventDefault();
    $('html, body').animate( {scrollTop:0}, 1000 );
});