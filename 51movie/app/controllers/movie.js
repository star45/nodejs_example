/**
 * 
 */

var Movie = require('../models/Movie');
exports.list = function(req, res, next) {

    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render('list', { 
            title: '51电影网列表页',
            movies:movies
        });
    });
    // Movie.find({},function(err,movies){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.render('list', { 
    //             title: '51电影网列表页',
    //             movies:movies
    //         });
    //     }     
    // });
  
};
exports.detail = function(req, res, next) {
    var id = req.params.id;
    Movie.findById(id,function(err,movie){
        res.render('detail', { 
            title: '51电影网详情页'+movie.title,
            movie:movie
        });
    });
  
};
exports.new = function(req, res, next){ 
  res.render('admin', { title: '51电影网录入页',movie:{}});
};
exports.get = function(req,res,next){
    var id = req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin', { 
                title: '51电影网后台更新页',
                movie:movie
            });
        });
    }
};

exports.save = function(req,res,next){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie = null;
    if(id){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            _movie = _.extend(movie,movieObj);
            _movie.save(function(err,movie){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/'+movie._id);
            });
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
        });
         _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }
            res.redirect('/movie/'+movie._id);
        });
    }
};

exports.delete = function(req,res,next){

    var id = req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }
        });
    }
};