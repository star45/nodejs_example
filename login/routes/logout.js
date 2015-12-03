/**
 * 
 */
var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect('index');
});


module.exports = router;
