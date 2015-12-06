/**
 * 
 */
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var SALT_WORK_FACTOR = 10;

//用户数据类型
var UserSchema = new Schema({
    name:{
        type:String,
        unique:true
    },
    password:String,
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

UserSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    //生成随机的盐，和密码混合后再进行加密
    // bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    //     if(err) return next(err);

    //     bcrypt.hash(UserSchema.password,salt,function(err,hash){
    //         if(err) return next(err);

    //         UserSchema.password = hash;  //将hash后的密码赋值到当前用户密码
    //         next();
    //     });
    // });
    next();
});

UserSchema.methods = {
    comparePassword:function(_password,callback){
        callback(null,true);
        // bcrypt.compare(_password,this.password,function(err,isMatch){
        //     if(err){
        //         return callback(err);
        //     }
        //     callback(null,isMatch);
        // }); 
    }
};

UserSchema.static = {
    fetch: function(cb){
        return this.find({}).sort('meta.updataAt').exec(cb);
    },
    findById: function(id,cb){
        return this.findOne({_id: id}).exec(cb);
    }
};

module.exports = UserSchema;





