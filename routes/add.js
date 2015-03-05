/* 
	Allows user to add a new page to the wiki
*/

var mongoose = require('mongoose');
var models = require('../models/topicModel');

var routes = {};

var Topic = models.Topic;

/*form data comes in the req.body and this function 
saves the new wiki data to the database*/
routes.addTopic = function(req,res){

	var name = req.body.name;
	var img = req.body.img;
	var description = req.body.description;
	var dateAdded = new Date();
	var rules = req.body.rules;

	// Create new topic based on the user's post request
	var newTopic = new Topic({name:name, 
		img:img, 
		description:description,
		dateAdded:dateAdded,
		rules:rules});

	// Save new topic to database
	newTopic.save(function(err){
		if(err){
			console.error('Cant add topic');
			res.status(500).send("Couldn't add topic");
		}
		res.send(newTopic);
	});
}


module.exports = routes;