/**
 * 
 */
var express = require('express');
var router = express.Router();
var Movie = require('../app/controllers/movie');

router.get('/:id', Movie.detail);

module.exports = router;