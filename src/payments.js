var fs = require('fs');
var assert = require('assert');
var db;

var _paymentsData;

var payments = {
	init: function (database) {
		db = database;
	},
	getPayments: function(req, res) {
		fs.readFile('data.json', function(err, data) {
			_paymentsData = data;
		    res.setHeader('Content-Type', 'application/json');
		    res.send(data);
		});
	},
	savePayments: function(req, res) {
		var paymentsAsString = "[" + JSON.stringify(req.body) + "]"
		fs.writeFile('data.json', paymentsAsString, function(err) {
			console.log(req.body);
			_paymentsData = req.body;
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Cache-Control', 'no-cache');
			res.send(req.body);

	    });
	},
	monthsmax: function(req, res) {
		fs.readFile('months-max.json', function(err, data) {
		    res.setHeader('Content-Type', 'application/json');
		    res.send(data);
		});
	}
};

module.exports = payments;