var express = require('express');
var router = express.Router();

/* GET home listing. */
router.get('/home', function (req, res) {
        if(req.session.user){
            var Commodity = global.dbHelper.getModel('commodity');
            Commodity.find({}, function (error, docs) {
                res.render('home',{Commoditys:docs});
            });
        }else{
            req.session.error = "请先登录"
            res.redirect('/login');
        }
    });
router.get('/addcommodity', function(req, res) {
    res.render('addcommodity');
});
router.post('/addcommodity', function (req, res) {
    var Commodity = global.dbHelper.getModel('commodity');
    Commodity.create({
        name: req.body.name,
        price: req.body.price,
        imgSrc: req.body.imgSrc
    }, function (error, doc) {
        if (doc) {
            res.send(200);
        }else{
            res.send(404);
        }
    });
});

module.exports = router;