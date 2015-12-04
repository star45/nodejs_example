var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/',function(req,res,next){
        res.render('login');
});
router.get('/login',function(req,res,next){
        res.render('login');
});
router.post('/login', function (req, res) {
    var User = global.dbHelper.getModel('user'),
        uname = req.body.uname;
    User.findOne({name: uname}, function (error, doc) {
        if (error) {
            res.send(500);
            console.log(error);
        } else if (!doc) {
            req.session.error = '用户名不存在！';
            res.send(404);
        } else {
           if(req.body.upwd != doc.password){
               req.session.error = "密码错误!";
               res.send(404);
           }else{
               req.session.user=doc;
               res.send(200);
           }
        }
    });
});

module.exports = router;

