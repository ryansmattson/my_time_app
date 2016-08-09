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


module.exports = router;
