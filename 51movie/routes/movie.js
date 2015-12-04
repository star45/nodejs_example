var express = require('express');
var Movie = require('../models/Movie');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var id  =req.params.id;
    Movie.findOne(id,function(err,movie){
        res.render('detail', { 
            title: '51电影网详情页'+movie.title,
            movie:movie
        });
    });
  
});

module.exports = router;