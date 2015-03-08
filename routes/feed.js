/* 
	Send all video data to front end 
*/

var mongoose = require('mongoose');
var models = require('../models/TagVideoUserModels');

var routes = {};

var Video = models.Video;
var User = models.User;

routes.dispFeed = function(req,res){

	// Video.find({}, function(err, topics))

}

routes.getPages = function(req, res) {

	// Finds all of the topics in the db
	Topic.find({}, function (err, topics) {
		if (err) {
			console.error("Couldn't find the topics", err);
			res.status(500).send("Couldn't find the topics");
		};
		//Sends an array of Topic objects
		res.send(topics);
	});

};

routes.dispTopic = function(req,res){
	// Get the topic id from the url
	var topicId = req.params.topic;
	
	// Finds topic by the id
	Topic.findOne({_id:topicId}).exec(function(err,topicPage){
		if(err){
			console.error("Can't find this topic");
			res.status(500).send("Couldn't find this topic");
		}
		//Send topic to be rendered
		var topicInfo = topicPage;
		res.send(topicInfo);
	});
}

module.exports = routes;