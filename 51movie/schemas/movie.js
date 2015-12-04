/**
 * 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//电影数据类型
var MovieSchema = new Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    pv:{
        type:Number,
        default:0
    },
    category:{
        type:ObjectId,
        ref:'Category'
    },
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

MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
})

MovieSchema.static = {
    fethc: function(cb){
        return this
        .find({})
        .sort('meta.updataAt')
        exec(cd)
    },
    findById: function(id,cb){
        return this
        .findOne({_id: id})
    }
}

module.exports = MovieSchema;





