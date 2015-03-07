//REQUIRES
var express = require("express");
var session = require('express-session');
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require("mongoose");

var index = require("./routes/index");
var edit = require("./routes/edit");
var add = require("./routes/add");
var feed = require("./routes/feed");


var app = express();

//Middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//API routes that angular will use to get and post data 
app.get("/api/feed", feed.dispFeed);

//app.get("/api/pages/:topic", pages.dispTopic);

//app.post("/api/edit/:topic", edit.editTopic);

app.post("/api/editTags", edit.editTags);

app.post("/api/addVideo", add.addVideo);

//app.post("/api/search", index.search);


mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');
var PORT = 3000;

app.listen(process.env.PORT || PORT);