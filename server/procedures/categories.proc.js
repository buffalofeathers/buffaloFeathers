var db = require('../config/db');

exports.all = function() {
    return db.rows('get_categories');
}
