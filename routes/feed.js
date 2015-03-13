/* 
	Send all video data to front end 
*/

var mongoose = require('mongoose');
var models = require('../models/TagVideoUserModels');

var routes = {};

var Video = models.Video;
var User = models.User;

routes.dispFeed = function(req,res){
	console.log("hi" + req.user._json.first_name);
	var render_info = {};
	render_info.loggedInUser = req.user._json.first_name;
	Video.find({}, function(err, videos){
		if(err){
			console.error("Couldn't find the videos", err);
			res.status(500).send("Couldn't find the videos");
		};
		render_info.videos = videos;
		res.send(render_info);
	});

}

routes.showLogin = function(req,res){
	res.render("login");
}

routes.login = function(req, res){
	console.dir(req.cookies);
	console.dir(req.session);
	var message;
	console.log(req.user._json.first_name);
	console.log(req.isAuthenticated());
	var firstName= req.user._json.first_name;
	User.findOne({username: firstName}, function(err,user){
		if(err){
			res.status(500).json({error:'Something crashed while finding user'});
		}
		if(!user){
			var newUser = new User({username:firstName,
				fbid:'fake', tags:[]});

			newUser.save(function(err){
				if(err){
					res.status(500).json({error:'Something crashed while saving user'});
				}
				
				else{
					req.session.name = newUser;
					req.session.save(function(){
						console.log('NEW USER ALERT');
						console.log(newUser);
						res.redirect('/#/feed');
					});
					
					
				}
			});
		}
		else{
			
			req.session.name = user;
			req.session.save(function(){
				console.log("existing user");
				console.log(user);
				console.log(req.user);
				res.redirect('/#/feed');
			});
			
		}
		
	});

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