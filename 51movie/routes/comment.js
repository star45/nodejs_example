/**
 * 
 */
var express = require('express');
var router = express.Router();
var Comment = require('../app/controllers/comment');

router.post('/user/comment',Comment.save);

module.exports = router;