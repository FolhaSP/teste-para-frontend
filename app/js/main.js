var width;

$(document).ready(function () {
  // $('.carrosel').slick({
  //   dots: true,
  //   dotsClass: 'dots-carrossel'
  // });
  //
  // width = $(document).width();
});

function toTop(){
  $('html, body').animate({
  scrollTop: 0
  }, 1000, 'linear');
}

$(window).resize(function () {
  // var carrosel;
  // if (width !== $(document).width()) {
  //   if (width < 1400) {
  //     if(width < $(document).width()){
  //       carrosel = $('.carrosel-item').css('height');
  //       var conta = parseInt(carrosel) + 1;
  //       console.log(conta);
  //       $('.carrosel-item').css('height', conta);
  //     }
  //     else {
  //       carrosel = $('.carrosel-item').css('height');
  //       var conta = parseInt(carrosel) - 1;
  //       console.log(conta);
  //       $('.carrosel-item').css('height', conta);
  //     }
  //   }
  //   width = $(document).width();
  // }
});
