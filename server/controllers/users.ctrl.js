var express = require('express');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw');
var passport = require('passport');
var utils = require('../utils');

var router = express.Router();

router.get('/genHash/:pw', function(req, res) {
    utils.encryptPassword(req.params.pw)
    .then(function(hash) {
        res.send(hash);
    });
})
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) { // login failure
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);
});
router.get('*', auth.isLoggedIn);

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        req.logOut();
        res.sendStatus(204);
    });
});



router.get('/me', function(req, res) {
    res.send(req.user);
});

router.get('/', function(req, res){
    procedures.all().then(function(users){
        res.send(users);
    }, function(err) {
        res.status(500).send(err);
    });
});

router.post('/', function(req, res) {
    var u = req.body;
    utils.encryptPassword(u.password)
    .then(function(hash) {
        return procedures.create(u.email, hash, u.firstname, u.lastname);
    }).then(function(id) {
        res.status(201).send(id);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    })
})
// auth.isLoggedIn, 


router.get('/:id', auth.isAdmin, function(req,res) {
    procedures.read(req.params.id).then(function(user) {
        res.send(user);
    }, function(err) {
        res.status(500).send(err);
    });
});

module.exports = router;