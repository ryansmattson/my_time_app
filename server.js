var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session')
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var newjob = require('./routes/jobs');

var app = express();

//Configures the session after user has logged in.
app.use(session({
	secret: 'secret',
	key: 'user',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 30 * 60 * 1000,
		secure: false
	}
}));

//If user is logged in, use the session
app.use(passport.initialize());
app.use(passport.session());

//The strategy for logging in
passport.use('local', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, function(username, password, done) {
	User.findAndComparePassword(username, password, function(err, isMatch, user) {
		if (err) {
			return done(err);
		}

		if (isMatch) {
			//Successfully authorize the user
			return done(null, user);
		} else {
			done(null, false);
		}
	});
}));

//Converts user to user id
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		if (err) {
			return done(err);
		}

		done(null, user);
	});
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/jobs', newjob);


var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log('Listening on port', port);
});
