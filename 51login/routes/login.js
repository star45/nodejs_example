/**
 * 
 */
var express = require('express');
var router = express.Router();

router.get('/login',function(req,res,next){
    res.render('login');
});

router.post('/login',function(req,res,next){
    var user={
        username:'admin',
        password:'admin'
    }
    if(req.body.username==user.username&&req.body.password==user.password){
        req.session.user = user;
        res.send(200);
    }else{
        req.session.error = "用户名或密码不正确"
        res.send( 404 );
    }
});
module.exports = router;