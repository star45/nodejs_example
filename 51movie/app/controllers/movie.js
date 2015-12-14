/**
 * 
 */
var Comment = require('../models/Comment');
var Movie = require('../models/Movie');
var Catetory = require('../models/Catetory');
var _ = require('underscore')
var fs = require('fs')
var path = require('path')

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
};
exports.detail = function(req, res, next) {
    var id = req.params.id;
    Movie.findById(id,function(err,movie){
        Movie.update({_id:id},{$inc:{pv:1}},function(err){
            if(err){
                console.log(err);
            }
        })
        Comment.find({movie: id})
            .populate('from','name')
            .populate('reply.from reply.to','name')
            .exec(function(err,comments){
                res.render('detail', { 
                    title: '51电影网详情页'+movie.title,
                    movie:movie,
                    comments:comments
                });
            });
    });
  
};
exports.new = function(req, res, next){ 
    Catetory.find({},function(err,catetories){
        if(err){
            console.log(err);
        }
        res.render('admin', { 
            title: '51电影网录入页',
            movie:{},
            catetories:catetories
        });
    });
    
};
exports.updata = function(req,res,next){
    var id = req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            Catetory.find({},function(err,catetories){
                res.render('admin', { 
                    title: '51电影网后台更新页',
                    movie:movie,
                    catetories:catetories
                });
            });
        });
    }
};

exports.save = function(req,res,next){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    console.log(movieObj);
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
        _movie = new Movie(movieObj);
        var catetoryId = movieObj.catetory;
        
        var catetoryName = movieObj.catetoryName;

        _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }
            if(catetoryId){
                Catetory.findById(catetoryId,function(err,catetory){
                    if(err){
                        console.log(err);
                    }
                    catetory.movies.push(movie._id)
                    catetory.save(function(err,catetory){
                        if(err){
                            console.log(err);
                        }
                        res.redirect('/movie/'+movie._id);
                    });  
                });
            }else if(catetoryName){
                var catetory = new Catetory({
                    name: catetoryName,
                    movies:[movie._id]
                });
                catetory.save(function(err,catetory){
                    movie.catetory = catetory._id;
                    movie.save(function(err,movie){
                        res.redirect('/movie/'+movie._id);
                    });
                }); 
            }
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