var router = require('express').Router();

var Time = require('../models/time.js');

router.post('/', function(req, res) {

	var data = req.body;
	var userId = req.user.id;

	Job.createJob(data.name, data.hourly_rate, data.date_created, data.bill_organization, data.bill_individual, data.notes, userId, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.redirect('/');
		};
	});
});


router.get('/allTimes', function(req, res) {

	var user = req.user;

	Job.findAllJobTimes(user.id, function(err, jobs) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(jobs);
		}
	});
});

module.exports = router;
