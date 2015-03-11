/*
	Allows user to add new video to the db
*/

/* 
	Allows user to add a new page to the wiki
*/

var mongoose = require('mongoose');
var models = require('../models/TagVideoUserModels');

var routes = {};

var Video = models.Video;

routes.addVideo = function(req,res){
	
	var title = req.body.title;
	var description = req.body.description;
	var url = req.body.url;
	var tags = req.body.tags; 
	

	// var title = "Test Video";
	// var description = "this is a test video haha";
	// var url = "https://www.youtube.com/watch?v=abfwHqKQsSY";
	// var tags = "Health";


	var newVideo = new Video({title:title, 
		description:description, url:url,
		tags:tags});

	newVideo.save(function(err){
		if(err){
			console.error('Cant add video');
			res.status(500).send("Couldn't add video");
		}
		res.send(newVideo);
	});

	

	
}

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