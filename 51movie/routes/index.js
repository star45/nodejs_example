var express = require('express');
var Movie = require('../models/Movie')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render('index', { 
            title: '51电影网首页',
            movies: []
        });
    });
});

module.exports = router;
