var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.text({ type: 'text/plain' }))

app.get('/instructions', function(req, res) {
	fs.readFile('instructions.txt', function(err, data) {
		res.setHeader('Content-Type', 'text/plain');
		res.setHeader('Data-Type', 'text');
		res.send(data);
	});
});

app.post('/instructions', function(req, res) {
	fs.readFile('instructions.txt', function(err, data) {
		var newInstructions = req.body;
		fs.writeFile('instructions.txt', newInstructions, function(err) {
		  res.setHeader('Content-Type', 'text/plain');
		  res.setHeader('Cache-Control', 'no-cache');
		  res.send(newInstructions);
		});
	});
});

var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, function () {
  console.log('Server started at port %s', port);
});