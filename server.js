var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
// middleware function, gets executed on each request
app.use(function(req, res, next) {
	console.log('Got a request!');
	next();
});
// middleware for parsing the body and turning it into a JS object
app.use(bodyParser.urlencoded({
	extended: true
}));
app.post('/', function(req, res) {
	console.log('req.body=', req.body);
	res.sendStatus(200);
});
app.get('/', function(req, res) {
	console.log('Received a request at', new Date());
	// __dirname is the folder this file lives in
	var filename = path.join(__dirname, 'public/views/index.html');
	console.log('filename:', filename);
	res.sendFile(filename);
});
var songs = [];
app.post('/songs', function(req, res) {
	var d = new Date();
	var repeat;
	songs.forEach(function(index) {
		if (index.title === req.body.title && index.artist === req.body.artist) {
			repeat = true;
		} else {
			repeat = false;
		}
	});
	console.log(repeat);
	console.log('req.body:', req.body);
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
app.post('/songs/delete', function(req, res) {
	var body = req.body;
	console.log(body);
	songs.splice(body.index, 1);
	console.log(songs);
	res.sendStatus(200);
})
app.get('/songs', function(req, res) {
	res.send(songs);
});
// middleware for serving static files
app.use(express.static('public'));
app.listen(3000);
//
// app.get('/kittens', function(req, res){
//   console.log('Query params:', req.query);
//   if (req.query.age > 2) {
//     res.send('MEOW!');
//   } else {
//     res.send('meow');
//   }
// });
