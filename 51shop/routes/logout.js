var express = require('express');
var router = express.Router();

/* GET logout listing. */
router.get('/logout', function(req, res){
        req.session.user = null;
        req.session.error = null;
        res.redirect('/');
    });

module.exports = router;
