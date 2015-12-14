
/**
 * 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//电影数据类型
var CatetorySchema = new Schema({
    name: String,
    movies: [{type: ObjectId,ref:'Movie'}],
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

CatetorySchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
});

CatetorySchema.static('fetch',function(callback){
    return this.find({}).sort('meta.updataAt').exec(callback);
});
CatetorySchema.static.findAll2 = function(callback){
    return this.find({}).sort('meta.updataAt').exec(callback);
};
CatetorySchema.static = {
    fetch: function(cb){
        return this.find({}).sort('meta.updataAt').exec(cb);
    },
    findById: function(id,cb){
        return this.findOne({_id: id}).exec(cb);
    }
};

module.exports = CatetorySchema;





