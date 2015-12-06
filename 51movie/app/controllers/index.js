/**
 * 
 */
var Movie = require('../models/Movie');
exports.index = function(req,res,next){
    
    Movie.findAll(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render('index', { 
            title: '51电影网首页',
            movies: movies
        });
    });
};
