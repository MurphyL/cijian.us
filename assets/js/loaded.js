(function(w, embed) {
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
