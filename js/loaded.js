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
    } else {
      $('.nav-fixed').css({
        '-webkit-transform': 'translate3d(0, 0, 0)',
        '-moz-transform': 'translate3d(0, 0, 0)',
        'transform': 'translate3d(0, 0, 0)'
      });
    }
  })
});
// duoshuo
(function(w, embed) {
	if(!document.querySelector('.ds-thread')){
		return;
	}
	w.duoshuoQuery = {short_name:"cijian"};
	var ds = document.createElement('script');
	ds.type = 'text/javascript';ds.async = true;
	ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + embed;
	ds.charset = 'UTF-8';
	(document.getElementsByTagName('head')[0]  || document.getElementsByTagName('body')[0]).appendChild(ds);
})(window, '//static.duoshuo.com/embed.js');
