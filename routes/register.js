var router = require('express').Router();

var User = require('../models/user.js');

router.post('/', function(req, res){
  User.createUser(req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.email, req.body.phone, req.body.address, req.body.hourly_rate, function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.redirect('/');
    };
  });
});

module.exports = router;
