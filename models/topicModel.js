/* 
	The db schema for a topic in our wiki
	img is a string of a url so the picture
	is not a file upload because we don't want to store
	all that in our db
*/

var mongoose = require("mongoose");

var topicSchema = mongoose.Schema({
	name: String,
	img: String,
	description: String,
	dateAdded: Date,
	rules: String
});

var Topic = mongoose.model('Topic', topicSchema);

module.exports.Topic = Topic;

 