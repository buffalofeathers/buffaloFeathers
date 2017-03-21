var express = require('express');
var procedures = require('../procedures/categories.proc');
var auth = require('../middleware/auth.mw');
var passport = require('passport');

var router = express.Router();

// router.get('*', auth.isLoggedIn);

router.get('/', function(req, res){
    procedures.all().then(function(categories){
        res.send(categories);
    }, function(err) {
        res.sendStatus(500);
    });
});

module.exports = router;