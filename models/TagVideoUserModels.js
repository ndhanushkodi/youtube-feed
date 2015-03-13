/* 
	Models for tags, videos, and users
*/

var mongoose = require("mongoose");

var tagSchema = mongoose.Schema({
	name: String
});

var videoSchema = mongoose.Schema({
	title: String,
	description: String,
	url: String,
	tagid:{
		tags: String
	}
});

var userSchema = mongoose.Schema({
	username: String,
	fbid: String,
	tags: [String]
});

var Tag = mongoose.model('Tag', tagSchema);
var Video = mongoose.model('Video', videoSchema);
var User = mongoose.model('User', userSchema);

module.exports.Tag = Tag;
module.exports.Video = Video;
module.exports.User = User;

 