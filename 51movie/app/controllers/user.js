/**
 * 
 */

var User = require('../models/User');

/* GET users listing. */
exports.list = function(req,res,next){
    User.find({},function(err,users){
        if(err){
            console.log(err);
        }else{
            res.render('userlist', { 
                title: '51电影网用户列表页',
                users:users
            });
        }     
    });
};
exports.signup = function(req,res,next){
    var _user  = req.body.user;
    User.find({name: _user.name},function(err,user){
        if(err){
            console.log(err);
        }
        if(user){
            res.redirect('/signin');
        }else{
             var userNew  = new User(_user);
            userNew.save(function(err,user){
                if(err){
                    console.log(err);
                }
                res.redirect('/');
            });
        }
    });
   
};
exports.signin = function(req,res,next){
    var _user  = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/signup');
        }
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err);
            }
            if(isMatch){
                req.session.user = user;
                return res.redirect('/');
            }else{
                console.log('密码不正确');
                return res.redirect('/signin');
            }
        });
    });
};
exports.logout = function(req,res,next){
    delete req.session.user;
    res.redirect('/');
};
exports.showSignup = function(req,res,next){
    res.render('signup', { 
        title: '注册页面'
    });
};
exports.showSignin = function(req,res,next){
    res.render('signin', { 
        title: '登陆页面'
    });
};

exports.siginRequired = function(req,res,next){
    var user  = req.session.user;
    if(!user){
        return res.redirect('/signin');
    }
    next();
};
exports.adminRequired = function(req,res,next){
    var user  = req.session.user;
    if(user.role<=10){
        return res.redirect('/signin');
    }
    next();
};




















