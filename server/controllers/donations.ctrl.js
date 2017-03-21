var express = require('express');
var stripeSvc = require('../services/stripe.svc');

var router = express.Router();
// actually /api/donations
router.post('/', function(req, res) {
    var amount = Number(req.body.amount);
    // amount = amount * 100;
    amount *= 100;

    // assuming front end is sending POST request here
    // with a request body with properties named amount and token

    stripeSvc.chargeCard(req.body.token, amount, 'Buffalo Feathers donation')
    .then(function(success) {
        console.log(success);
        res.sendStatus(204);
    }, function (err) {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router