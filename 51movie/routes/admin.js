var express = require('express');
var Movie = require('../app/controllers/movie');
var User  = require('../app/controllers/user');
var Catetory  = require('../app/controllers/catetory');
var router = express.Router();

router.get('/movie/list',Movie.list);
router.get('/movie/new',Movie.new);
router.get('/movie/update/:id',Movie.updata);
router.post('/movie/save',Movie.save);
router.delete('/movie/list',Movie.delete);

router.get('/user/list',User.list);

router.get('/catetory/new',Catetory.new);
router.post('/catetory/save',Catetory.save);
router.get('/catetory/list',Catetory.list);
module.exports = router;


















