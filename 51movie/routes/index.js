/**
 * 
 */
var express = require('express');
var router = express.Router();
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');

router.get(function(req,res,next){
    next();

});
/* GET home page. */
router.get('/', Index.index);
router.get('/signup',User.showSignup);
router.get('/signin',User.showSignin);
router.get('/results',Index.search);
module.exports = router;
