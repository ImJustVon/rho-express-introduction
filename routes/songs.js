var express = require('express');
//bring in a router from the express library
var router = express.Router();
var songs = [];
router.post('/songs', function(req, res) {
	var d = new Date();
	var repeat;
	songs.forEach(function(index) {
		if (index.title === req.body.title && index.artist === req.body.artist) {
			repeat = true;
		} else {
			repeat = false;
		}
	});
	if (req.body.title.trim() == '' || req.body.artist.trim() == '') {
		res.sendStatus(403);
	} else if (repeat) {
		res.sendStatus(409);
	} else {
		req.body.date = d.toString();
		songs.push(req.body);
		console.log('songs', songs);
		res.sendStatus(200);
	}
});
router.post('/songs/delete', function(req, res) {
	var body = req.body;
	console.log(body);
	songs.splice(body.index, 1);
	console.log(songs);
	res.sendStatus(200);
})
router.get('/songs', function(req, res) {
	res.send(songs);
});
module.exports = router;
