//REQUIRES
var express = require("express");
var session = require('express-session');
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

//OAUTH
var config = require('./oauth.js')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

var auth = require("./routes/auth");
var index = require("./routes/index");

var add = require("./routes/add");
var feed = require("./routes/feed");



var app = express();
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');
var PORT = 3000;

//Middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));




// serialize and deserialize
passport.serializeUser(function(user, done) {
	console.log("serialize");
	console.log(user);
done(null, user);
});
passport.deserializeUser(function(obj, done) {
	console.log("deserialize");
done(null, obj);
});

// config
passport.use(new FacebookStrategy({
 clientID: config.facebook.clientID,
 clientSecret: config.facebook.clientSecret,
 callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));




//API routes that angular will use to get and post data 

//app.get("/api/feed", feed.dispFeed);

//app.get("/api/pages/:topic", pages.dispTopic);

//app.post("/api/edit/:topic", edit.editTopic);

//app.post("/api/editTags", edit.editTags);



//app.post("/api/search", index.search);


//ROUTES
app.get("/api/", ensureAuthenticated, feed.dispFeed);
//app.get("/", function(req,res){res.render("hi");});
app.get("/api/log", feed.showLogin);
app.post("/api/addVideo", add.addVideo);
app.post("/login", feed.login)


app.post('/api/login',
passport.authenticate('facebook'),
function(req, res){
	console.log('hi');
	res.send('nothing');
});

app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
feed.login);


app.get('/logout', function(req, res){
req.logout();
res.redirect('/');
});


app.listen(process.env.PORT || PORT);

function ensureAuthenticated(req, res, next) {
	console.log('ensureAuthenticated');
	console.log(req.user);
	console.log(req.session);
	console.log(req.passport);
if (req.isAuthenticated()) { return next(); }
console.log('not logged in');
res.redirect('/api/log')
}