var router = require('express').Router();
var passport = require('passport');

router.get('/', function(req, res){
  res.send(req.isAuthenticated());
}); 

router.get('/success', function(req, res){
  res.sendStatus(200);
});

router.get('/failure', function(req, res){
  res.sendStatus(401);
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failure'
}));


module.exports = router;
