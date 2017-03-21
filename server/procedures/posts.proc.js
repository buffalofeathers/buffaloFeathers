var db = require('../config/db');

exports.all = function() {
    return db.rows('get_allPosts');
}

exports.read = function(id) {
    return db.row('get_onePost', [id]);
}

exports.create = function(title, content, userid, categoryid) {
    return db.row('insert_post', [title, content, userid, categoryid]);
}

exports.update = function(id, title, content, categoryid) {
    return db.empty('update_post', [id, title, content, categoryid]);
}

exports.destroy = function(id) {
    return db.empty('delete_post', [id]);
}