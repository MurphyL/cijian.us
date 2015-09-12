(function(fs, xml2js, path, oldPostDataFile, posts){

	var parser = new xml2js.Parser();

	fs.readFile(oldPostDataFile, "utf-8", function(err, data){
		parser.parseString(data, function (err, result) {
			var oldPosts = result.rss.channel;
			
	        fs.writeFile(path + "post_data.json", JSON.stringify(oldPosts[0].item), "UTF-8");
	        console.log('Done');
	    });
	})


})(require('fs'), require('xml2js'), "./posts/", "wp.xml");