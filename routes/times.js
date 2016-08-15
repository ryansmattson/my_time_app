var router = require('express').Router();

var Time = require('../models/time.js');


router.get('/allTimes/:id', function(req, res) {
	var job_id = req.params.id;

	Time.findAllTimes(job_id, function(err, times) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(times);
		}
	});
});


router.post('/clockIn', function(req, res) {
	var data = req.body;

	Time.createClockIn(data.job_id, data.clockInTime, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});

router.put('/clockOut', function(req, res) {
	var data = req.body;
	console.log('data.job_id:', data.job_id);
	console.log('data.clockOutTime:', data.clockOutTime);

	Time.createClockOut(data.job_id, data.clockOutTime, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});


router.delete('/deleteTime/:id', function(req, res) {
	var time_id = req.params.id;

	Time.deleteTime(time_id, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});


module.exports = router;
