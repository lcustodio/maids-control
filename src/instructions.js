var fs = require('fs');
var assert = require('assert');
var db;

var instructions = {
	init: function (database) {
		db = database;
	},
	readInstructions: function(req, res) {
		var collection = db.collection('instructions');
		collection.find({}).toArray(function(err, instructions) {
		    assert.equal(err, null);
		    console.log("Found the following records");
		    if(instructions && instructions.length > 0) {
			    res.setHeader('Content-Type', 'text/plain');
				res.setHeader('Data-Type', 'text');
				res.send(instructions[0].main);
			}
		});
	},
	saveInstructions: function(req, res) {
		var collection = db.collection('instructions');
		collection.find({}).toArray(function(err, instructions) {
		    assert.equal(err, null);
		    if(instructions && instructions.length > 0) {
		    	collection.update({ dummy : 0 }, { $set: { main : req.body }}, function(err, result) {
				    assert.equal(err, null);
				    console.log("Updated intructions.");
				    res.setHeader('Content-Type', 'text/plain');
			  		res.setHeader('Cache-Control', 'no-cache');
			  		res.send(req.body);
				});
		    } else {
		    	collection.insert({ dummy : 0, main : req.body }, function(err, result) {
				    assert.equal(err, null);
				    console.log("Inserted intructions.");
				    res.setHeader('Content-Type', 'text/plain');
			  		res.setHeader('Cache-Control', 'no-cache');
			  		res.send(req.body);
				});
		    }
		});
	}
};

module.exports = instructions;