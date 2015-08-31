/** **/
$(function(){
  $(document).scroll(function(e){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop > 200){
      $('.nav-fixed').css({
        '-webkit-transform': 'translate3d(0, -130px, 0)',
        '-moz-transform': 'translate3d(0, -130px, 0)',
        'transform': 'translate3d(0, -130px, 0)'
      });
    }
  })
});
