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
var times = require('./routes/times');
var users = require('./routes/users');
var invoices = require('./routes/invoices');
var path = require('path');

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

var checkAuth = function(req, res, next){
	if (req.isAuthenticated()) {
	 	next();
	} else {
		res.sendStatus(401);
	}
};




app.use('/', index);
app.use('/register', register);
app.use('/login', login);

app.use('/jobs', checkAuth, newjob);
app.use('/times', checkAuth, times);
app.use('/users', checkAuth, users);
app.use('/invoices', checkAuth, invoices);


app.get('/logout', function(req, res){
  req.logout();
	// res.redirect('/');
	res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.get('/allUsernames', function(req, res){
	User.findAllUsernames(function(err, usernames){
		if(err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(usernames)
		}
	})
})



app.use('/*', function(req, res) {
	res.sendFile(path.join(__dirname, './public/views/index.html'));
});


var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Listening on port:', port);
});

//
// var server = app.listen(3000, function() {
// 	var port = server.address().port;
// 	console.log('Listening on port', port);
// });
