var Comment  = require('../models/Comment');

exports.save = function(req,res,next){
    var _comment = req.body.comment;
    var movieId = _comment.movie;
    var comment = new Comment(_comment);
    if(_comment.cid){
        Comment.findById(_comment.cid,function(err,comment){
           var reply = {
                from:_comment.from,  //回复评论人
                to:_comment.tid,         //回复给谁
                content:_comment.content, //回复内容
                meta: {
                    createAt: Date.now()
                }   
            };
            comment.reply.push(reply); 
            comment.save(function(err,comment){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/'+movieId);
                //在数据库中保存用户评论后会生成一条该评论的_id，服务器查找该_id对应的值返回给客户端
                Comment
                    .findOne({_id:comment._id})
                    .populate('from','name')
                    .populate('reply.from reply.to','name')//查找评论人和回复人的名字
                    .exec(function(err,comments){
                        res.json({data:comments});
                    });
            }); 
        });
    }else{
        //将用户评论创建新对象并保存
        var comment = new Comment(_comment);
        comment.save(function(err,comment){
            if(err){
                console.log(err);
            }
            // res.redirect('/movie/' + movieId);
            //在数据库中保存用户评论后会生成一条该评论的_id，服务器查找该_id对应的值返回给客户端
            Comment
                .findOne({_id:comment._id})
                .populate('from','name')
                .populate('reply.from reply.to','name')//查找评论人和回复人的名字
                .exec(function(err,comments){
                    res.json({data:comments});
                });     
        }); 
    }


    
};