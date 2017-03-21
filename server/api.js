var express = require('express');
var categories = require('./controllers/categories.ctrl');
var users = require('./controllers/users.ctrl');
var posts = require('./controllers/posts.ctrl');
var contact = require('./controllers/contact.ctrl');
var donations = require('./controllers/donations.ctrl');

var router = express.Router();

router
    .use('/categories', categories)
    .use('/users', users)
    .use('/posts', posts)
    .use('/contact', contact)
    .use('/donations', donations);

module.exports = router;