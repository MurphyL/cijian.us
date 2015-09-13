(function(fs, striptags, path, oldPostDataFile, posts){

	var joins = [
		'---\nlayout: post \ntitle: "',
		'"\ndate: ',
		'\ncategories: ',
		'\n---\n\n'
	];
	var done = ['1295','1289','1284','1283','1280','1276','1272','1270','1268','1266','1261','1258','1253','1248','1022','1235','439','443','402','344','254','192','113','92','1262','1260','1238','1096'	];
	fs.readFile(oldPostDataFile, "utf-8", function(err, data){
		posts = eval(data);
		var articles = {};
		for (var i = posts.length - 1; i >= 0; i--) {
			
			var post = posts[i];
			var id = post['wp:post_id'][0];
			console.log(i, id, post['title'][0], done.indexOf(id));
			if(done.indexOf(id) > -1){
				continue;
			}
			var cates = post['category'];
			var categoryString = '';
			for (var j = cates.length - 1; j >= 0; j--) {
				var cat = cates[j];
				if(/の/.test(cat['_'])){
					continue;
				}
				categoryString += cat['_'] + ' ';
			};
			var contentHTML = post['content:encoded'][0];
			var linesContent = striptags(contentHTML);		

			var file_content = joins[0] + post['title'][0] + 
							   joins[1] + post['wp:post_date'][0] + 
							   joins[2] + categoryString.trim() + 
							   joins[3] + linesContent.trim();
			var fn_prefix = post['wp:post_date'][0].split(' ')[0] + '-';
			var fn_seffix = post['wp:post_name'][0].replace(/_/g, '-');
			fs.writeFile(path + fn_prefix + fn_seffix + ".md", file_content.trim(), "UTF-8");
			articles[post['wp:post_id'][0]] = {
				id: post['wp:post_id'][0],
				key: fn_seffix,
				name: post['title'][0].replace(/,/g, ' ')

			};
		};
		fs.writeFile(path + "post_data_new.csv", JSON.stringify(articles), "UTF-8");
		console.log('Done');
	})

})(require('fs'), require('striptags'), "./posts/", "./test/post_data.json");
