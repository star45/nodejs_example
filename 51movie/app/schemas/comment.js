/**
 * 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//电影数据类型
var CommentSchema = new Schema({
    
    movie: {type: ObjectId,ref: 'Movie'},
    from:{type:ObjectId,ref:'User'},   //评论人
    reply:[{                             //对评论人的回复
        from:{type:ObjectId,ref:'User'},
        to:{type:ObjectId,ref:'User'},     //被评论人
        content:String,
        meta: {
            createAt: {
                type: Date,
                default: Date.now()
            }
        }       
    }],                       
    content:String,                    //评论内容
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
        type: Date,
        default: Date.now()
        }
    }
});

CommentSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
});

CommentSchema.static('findAll',function(callback){
    return this.find({}).sort('meta.updataAt').exec(callback);
});
CommentSchema.static.findAll2 = function(callback){
    return this.find({}).sort('meta.updataAt').exec(callback);
};
CommentSchema.static = {
    fetch: function(cb){
        return this.find({}).sort('meta.updataAt').exec(cb);
    },
    findById: function(id,cb){
        return this.findOne({_id: id}).exec(cb);
    }
};

module.exports = CommentSchema;





