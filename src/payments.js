var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var collection;

MongoClient.connect("mongodb://localhost:27017/maids", function(err, db) {
  if(!err) {
    console.log("Connected to mongodb...");
  }

  collection = db.collection('payments');
});

var _paymentsData;

var payments = {
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