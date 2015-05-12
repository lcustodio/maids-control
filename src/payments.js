var fs = require('fs');
var assert = require('assert');
var db;

var _paymentsData;

var insertEmptyData = function(req, res) {
	var collection = db.collection('payments');
	fs.readFile('data.backup.json', function(err, data) {
	    collection.insert({ dummy : 0, data: data }, function(err, result) {
		    assert.equal(err, null);
		    console.log("Inserted empty payments data");
		    res.setHeader('Content-Type', 'application/json');
	    	res.send(data);
		});
	});
}

var payments = {
	init: function (database) {
		db = database;
	},
	getPayments: function(req, res) {
		var collection = db.collection('payments');
		collection.find({}).toArray(function(err, payments) {
		    assert.equal(err, null);
		    console.log("Found the following records");
		    if(payments && payments.length > 0) {
			    res.setHeader('Content-Type', 'application/json');
				res.send(payments[0].data);
			} else {
				insertEmptyData(req, res);
			}
		});
	},
	savePayments: function(req, res) {
		var collection = db.collection('payments');
		collection.find({}).toArray(function(err, payments) {
		    assert.equal(err, null);
		    if(payments && payments.length > 0) {
		    	collection.update({ dummy : 0 }, { $set: { data : [ req.body ] }}, function(err, result) {
				    assert.equal(err, null);
				    console.log("Updated payments.");
				    res.setHeader('Content-Type', 'application/json');
			  		res.send(req.body);
				});
		    } else {
		    	insertEmptyData(req, res);
		    }
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