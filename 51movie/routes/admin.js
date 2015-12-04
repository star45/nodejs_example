var express = require('express');
var _ = require('underscore');
var Movie = require('../models/Movie');
var router = express.Router();

router.get('/list', function(req, res, next) {
     Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render('list', { 
            title: '51电影网列表页',
            movies:movies
        });
    });
  
});
router.get('/movie', function(req, res, next) {
    console.log('sssssss22222222ssssssssssss')
  res.render('admin', { 
    title: '51电影网录入页'
    });
});

router.get('/movie/update/:id',function(req,res,next){
    var id = req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin', { 
                title: '51电影网后台更新页',
                movie:movie
            });
        });
    }
});

router.post('/movie/new',function(req,res,next){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie = null;
    if(id == 'undefined'){
        _movie = _.extend(movie,movieObj);
        _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }
            res.redirect('/movie/'+movie._id);
        });
    }else{
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            language: movieObj.language,
            country: movieObj.country,
            summary: movieObj.summary,
            flash: movieObj.flash,
            poster: movieObj.poster,
            year: movieObj.year
        })
         _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }
            res.redirect('/movie/'+movie._id);
        });
    }
});
module.exports = router;