var fs = require('fs');

var instructions = {
	readInstructions: function(req, res) {
		fs.readFile('instructions.txt', function(err, data) {
			res.setHeader('Content-Type', 'text/plain');
			res.setHeader('Data-Type', 'text');
			res.send(data);
		});
	},
	saveInstructions: function(req, res) {
		fs.readFile('instructions.txt', function(err, data) {
			var newInstructions = req.body;
			fs.writeFile('instructions.txt', newInstructions, function(err) {
		  		res.setHeader('Content-Type', 'text/plain');
		  		res.setHeader('Cache-Control', 'no-cache');
		  		res.send(newInstructions);
			});
		});
	}
};

module.exports = instructions;