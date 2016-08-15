var router = require('express').Router();

var User = require('../models/user.js');


router.get('/currentUser', function(req, res) {
	var user = req.user;

	User.findById(user.id, function(err, user) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(user);
		}
	});
});


router.put('/updateUser', function(req, res) {
	var data = req.body;

	User.updateUser(data.id, data.first_name, data.last_name, data.phone, data.email, data.address, data.hourly_rate, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});


module.exports = router;
