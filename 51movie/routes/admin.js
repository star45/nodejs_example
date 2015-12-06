var express = require('express');
var Movie = require('../app/controllers/movie');
var User  = require('../app/controllers/user');
var router = express.Router();

router.get('/movie/list',Movie.list);
router.get('/movie/new',Movie.new);
router.get('/movie/update/:id',Movie.detail);
router.post('/movie/new',Movie.save);
router.delete('/movie/list',Movie.delete);
router.get('/user/list',User.list);
module.exports = router;


















