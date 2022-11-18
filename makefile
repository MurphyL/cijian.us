default-cmd: serve

serve:
	docker run --rm -p 4000:4000 -v $(CURDIR):/src jclagache/github-pages serve --force_polling