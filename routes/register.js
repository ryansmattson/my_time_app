var router = require('express').Router();

var User = require('../models/user.js');

router.post('/', function(req, res){

  var data = req.body
  
  User.createUser(data.first_name, data.last_name, data.username, data.password, data.email, data.phone, data.address, data.hourly_rate, function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.redirect('/');
    };
  });
});

module.exports = router;
