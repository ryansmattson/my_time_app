var router = require('express').Router();

var Job = require('../models/job.js');

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

router.put('/changeCurrentJob', function(req, res) {

	var data = req.body;

	var userId = req.user.id;

	Job.setCurrentJobFalse(userId, function(err) {
		if (err) {
			console.log(err);
			// res.sendStatus(500);
		} else {
      setJobTrue();
			// res.sendStatus(200);
		}
	});

  function setJobTrue() {
    Job.setCurrentJobTrue(userId, data.job_id, function(err) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('newCallback Success');
        res.sendStatus(200);
      }
    });
  }
});




router.get('/allJobs', function(req, res) {
	var user = req.user;

	Job.findAllUserJobs(user.id, function(err, jobs) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(jobs);
		}
	});
});

router.get('/currentJob', function(req, res){
  var user = req.user;

  Job.findCurrentJob(user.id, function(err, job){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(job);
    }
  });
});


router.delete('/deleteJob/:id', function(req, res) {
	var job_id = req.params.id;

	console.log("Jobs 83");


	Job.deleteJob(job_id, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});


module.exports = router;
