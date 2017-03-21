var express = require('express');
var emailSvc = require('../services/email.svc');

var router = express.Router();

router.get('/test', function(req,res) {
    emailSvc.sendEmail('jessepayne@gmail.com', 'no-reply@buffalofeathers.com', 'Testing Email', 'Hello World')
    .then(function(success) {
        console.log(success);
        res.send('Email sent!');
    }, function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});

// router.post('/') HERE YOU WOULD SEND AN EMAIL TO YOURSELF, FROM THE EMAIL ADDRESS THE PERSON SENDS IN, THE EMAIL CONTENT WOULD BE MADE UP OF THE PERSON'S NAME AND THE MESSAGE THEY TYPED IN THE BOX'

module.exports = router;

