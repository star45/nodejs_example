/**
 * 
 */
var Catetory = require('../models/Catetory');
exports.list = function(req, res, next) {
    Catetory.fetch(function(err,categories){
        if(err){
            console.log(err);
        }
        res.render('catetorylist', { 
            title: '51电影网分类列表页',
            categories:categories
        });
    });  
};
exports.detail = function(req, res, next) {
    var id = req.params.id;
    Movie.findById(id,function(err,movie){
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
    console.log('11111');
    res.render('catetory_admin', 
        { 
            title: '51电影网分类录入页',
            catetory:{}
        }
    );
};
exports.save = function(req,res,next){
    var id = req.body.catetory._id;
    var catetoryObj = req.body.catetory;
    var _catetory = null;
    if(id){
        Catetory.findById(id,function(err,catetory){
            if(err){
                console.log(err);
            }
            _catetory = _.extend(catetory,catetoryObj);
            _catetory.save(function(err,catetory){
                if(err){
                    console.log(err);
                }
                res.redirect('/admin/catetory/list');
            });
        });
    }else{

        var _catetory1 = new Catetory(catetoryObj);
        console.log('dddddddd');
         console.log(_catetory1);
         _catetory1.save(function(err,catetory){
            if(err){
                console.log(err);
            }
            res.redirect('/admin/catetory/list');
        });
    }
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