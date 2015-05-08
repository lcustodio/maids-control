var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var collection;

MongoClient.connect("mongodb://localhost:27017/maids", function(err, db) {
  if(!err) {
    console.log("Connected to mongodb...");
  }

  collection = db.collection('instructions');
});

var instructions = {
	readInstructions: function(req, res) {
		collection.find({}).toArray(function(err, instructions) {
		    assert.equal(err, null);
		    console.log("Found the following records");
		    console.dir(instructions);
		    if(instructions && instructions.length > 0) {
			    res.setHeader('Content-Type', 'text/plain');
				res.setHeader('Data-Type', 'text');
				res.send(instructions[0].main);
			}
		});
	},
	saveInstructions: function(req, res) {
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