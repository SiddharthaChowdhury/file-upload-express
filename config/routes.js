module.exports = function($){
/* =====================================================================
*						Routes comes here.		
*	Please note:
*		`$` is an instance of `express.Router` class
*		to know more visit : 
*		https://expressjs.com/en/guide/routing.html#express-router
*  ---------------------------------------------------------------------
*/
	$.post('/upload-image',function(req, res){
		if (!req.files){
		    res.status(400)
		    return res.json({msg: 'No files were uploaded.'});
		}
		var _path = require('path');

		var file = req.files.incoming;
		var filename = Date.now();
		const fs = require('fs-extra');

		var extension = file.name.split('.').pop();
	    filename = filename+'.'+extension;

	    console.log(file)
	    var path = _root;
		path += '/uploads/images';
		var correctPath = _path.normalize(path);
		fs.ensureDir(correctPath, function(err) {
			if(err){
				res.status(400);
				return res.json({msg: 'Failed to created appropriate directories.'})
			}
			// Use the mv() method to place the file somewhere on your server 
			file.mv(correctPath+'/'+filename, function(err) {
			    if (err)  return res.status(500).send(err);
		    	var link = '/asset/images/'+filename
		    	return res.json({msg: "Image was uploaded successfully. ", link})
			});
		})
	});

// =====================================================================
return $;}