/**
 * 
 */
var express = require('express');
var router = express.Router();
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup',User.signup);
router.post('/signin',User.signin);
router.get('/logout',User.logout);
router.post('/comment',Comment.save);
module.exports = router;



















