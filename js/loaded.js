/** **/
$(function(){
  // 滚动隐藏 header 部分
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
  });
  // 快捷键翻页控制
	$(document).keydown(function(e){
	  var link;
	  switch(e.keyCode){
	    case 33:
	    case 37:
	      link = 'link[rel=prev]';
	      break;
	    case 34:
	    case 39:
	      link = 'link[rel=next]';
	      break;
	  }
	  link = $(link);
	  if(link.length){
	    location.href = link.attr('href');
	  }
	});
});
(function(w, embed) {
  // 百度统计
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?221d6affc0962df687673b64bad602fd";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
  // duoshuo
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
