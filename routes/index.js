/* 
	Provides search functionality for the home page 
*/

var mongoose = require('mongoose');
var models = require('../models/topicModel');

var routes = {};

var Topic = models.Topic;

/* This searches existing pages for the searched page.
The query is sent in req.body. */
routes.search = function(req, res) {
	var queryName = req.body.query;

	// Search for pages in the database by name
	Topic.find({name : queryName}, function(err, topics) {
		if (err) {
			console.error("Couldn't find any topics ", err);
			res.status(500).send("Couldn't find any topics matching that query");
		};
		res.send(topics);
	});
};

module.exports = routes;
