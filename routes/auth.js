var mongoose = require('mongoose');
var models = require('../models/TagVideoUserModels');

var routes = {};

var Video = models.Video;



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
						res.redirect('/api/');
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
				res.redirect('/api/');
			});
			
		}
		
	});

}