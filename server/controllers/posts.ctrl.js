var express = require('express');
var procedures = require('../procedures/posts.proc');
var auth = require('../middleware/auth.mw');
var passport = require ('passport');
var utils = require('../utils');

var router = express.Router();


router.get('/', function(req, res){
    procedures.all().then(function(posts){
        res.send(posts);
    }, function(err) {
        res.sendStatus(500);
    });
});

// router.post('/',auth.isLoggedIn, function(req, res) {
//     var p = req.body;
//     utils.encryptPassword(p.password)
//     .then(function(hash) {
//         return procedures.create(p.email, hash, p.firstname, p.lastname);
//     }).then(function(id) {
//         res.status(201).send(id);
//     }).catch(function(err) {
//         console.log('here is the error');
//         console.log(err);
//         res.sendStatus(500);
//     })
// })

   router.post('/',auth.isLoggedIn, auth.isAdmin, function (req, res) {
        var p = req.body;
        procedures.create(p.content, p.userid, p.categoryid, p.title)
            .then(function (id) {
                res.send(id);
            }, function (err) {
                res.status(500).send(err);
            });
    });


router.get('/:id', function(req,res) {
    procedures.read(req.params.id).then(function(user) {
        res.send(user);
    }, function(err) {
        res.status(500).send(err);
    });
});

router.put('/:id',auth.isLoggedIn, auth.isAdmin, function(req, res) {
    var p = req.body;
    procedures.update(p.title, p.content, p.categoryid, p.id)
    .then(function(id) {
        res.status(204).send(id);
    }, function(err) {
        res.sendStatus(500);
    
    });
});

router.delete('/:id', auth.isLoggedIn, auth.isAdmin, function(req, res) {
    var p = req.body;
    procedures.destroy(req.params.id)
    .then(function(id) {
        res.status(204).send(id);
    }, function(err) {
        res.sendStatus(500);
    
    });
});

module.exports = router;



