var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
});

exports.pool = pool;

// Use this function to call a procedure that doesn't return anything
exports.empty = function empty(procName, args) {
    return callProcedure(procName, args)
        .then( function() {} ); // throwing away the resultset
}

// Use this function to call a procedure when expecting a single item back
exports.row = function row(procName, args) {
    return callProcedure(procName, args)
            .then(function(resultsets) {
                return resultsets[0][0];
            });
}

// Use this function to call a procedure when expecting multiple rows back
exports.rows = function rows(procName, args) {
    return callProcedure(procName, args)
            .then(function(resultsets) {
                return resultsets[0];
            });
}

// Do not call this directly
function callProcedure(procName, args) {
    if (!args) {
        args = [];
    }
    var argString = '';
    for (var i = 0; i < args.length; i++) {
        if (i === args.length - 1) { // we're on the last argument
            argString += '?';
        } else {
            argString += '?,';
        }
    }
    return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query('CALL ' + procName + '(' + argString + ');', args, function(err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}

// exports.route('/api/posts')
//     .get(function(req, res) {
//         getAllPosts() 
//             .then(function(posts) {
//                 res.send(posts);
//             }, function(err) {
//                 res.status(500).send(err);
//             });
//     })
//     .post(function(req, res) {
//             var post = req.body;
//                 insertPost(post.content, post.userid, post.categoryid, post.title)
//                 .then(function(id) {
//                     res.send(id);
//                 }, function(err) {
//                     res.status(201).send(err);      
//                 });
//     });

// exports.route('/api/posts/:id')
//     .get(function(req, res) {
//         getOnePost(req.params.id)
//                 .then(function(onePost) {
//                     res.send(onePost);
//                 }, function(err) {
//                     res.status(500).send(err);
//                 });
//         })

//     .put(function(req, res) {
//             var post = req.body;
//                 updatePost(post.title, post.content, post.categoryid, req.params.id)
//                 .then(function() {
//                     res.sendStatus(204);
//                 }, function(err) {
//                     res.status(500).send(err);      
//                 });
//     })
//     .delete(function(req, res) {
//             var post = req.params;
//                 deletePost(post.id)
//                 .then(function() {
//                     res.sendStatus(204);
//                 }, function(err) {
//                     res.status(500).send(err);      
//                 });
//     });

// exports.route('/api/users')
//     .get(function(req, res) {
//         getUsers()
//         .then(function(users) {
//                 res.send(users);
//             }, function(err) {
//                 res.status(500).send(err);
//             });
//     });

// exports.route('/api/categories')
//     .get(function(req, res) {
//         getCategories()
//         .then(function(categories){
//                 res.send(categories);
//         }, function(err) {
//             res.status(500).send(err);
//         });       
//     });



// function getAllPosts() {
//           return new Promise(function(resolve, reject){
//                 pool.getConnection(function(err, connection) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         connection.query('CALL get_allPosts();', function(err, allPosts) {
//                             if (err) {
//                                 connection.release();
//                                 reject(err);
//                             } else {
//                                 connection.release();
//                                 var results = allPosts[0];
//                                 resolve(results);
//                             }
//                         });
//                     }
//                 });
//             });
//         }  

//  function insertPost(pContent, pUserID, pCategoryId, pTitle) {
//             return new Promise(function(resolve, reject){
//                 pool.getConnection(function(err, connection) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         connection.query('CALL insert_post(?,?,?,?);', [pContent, pUserID, pCategoryId, pTitle], function(err, resultsets) {
//                             if (err) {
//                                 connection.release();
//                                 reject(err);
//                             } else {
//                                 connection.release();
//                                 var results = resultsets[0];
//                                 resolve(results[0]);
//                             }
//                         });
//                     }
//                 });
//             });
//         }

//     function getOnePost(id) {
//         return new Promise(function(resolve, reject){
//                 pool.getConnection(function(err, connection) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         connection.query('CALL get_onePost(?);', [id], function(err, onePost) {
//                             if (err) {
//                                 connection.release();
//                                 reject(err);
//                             } else {
//                                 connection.release();
//                                 var results = onePost[0];
//                                 resolve(results[0]);
//                             }
//                         });
//                     }
//                 });
//             });
//         }  

//     function updatePost(pTitle, pContent, pCategoryid, pId) {
//             return new Promise(function(resolve, reject){
//                 pool.getConnection(function(err, connection) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         connection.query('CALL update_post(?,?,?,?);', [pTitle, pContent, pCategoryid, pId], function(err, resultsets) {
//                             if (err) {
//                                 connection.release();
//                                 reject(err);
//                             } else {
//                                 connection.release();                        
//                                 resolve();                               
//                             }
//                         });
//                     }
//                 });
//             });
//         }

//     function deletePost(pId) {
//             return new Promise(function(resolve, reject) {
//                     pool.getConnection(function(err, connection) {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             connection.query('CALL delete_post(?);', [pId], function(err) {
//                                 if (err) {
//                                     connection.release();
//                                     reject(err);
//                                 } else {
//                                     connection.release();
//                                     resolve(); 
//                                 }
//                             });
//                         }
//                     });
//                 });
//             }

//     exports.getUsers = function() {
//           return new Promise(function(resolve, reject){
//                 pool.getConnection(function(err, connection) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         connection.query('CALL get_users();', function(err, allUsers) {
//                             if (err) {
//                                 connection.release();
//                                 reject(err);
//                             } else {
//                                 connection.release();
//                                 var results = allUsers[0];
//                                 resolve(results);
//                             }
//                         });
//                     }
//                 });
//             });
//         }   
    
//     function getCategories() {
//           return new Promise(function(resolve, reject){
//                 pool.getConnection(function(err, connection) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         connection.query('CALL get_categories();', function(err, allCategories) {
//                             if (err) {
//                                 connection.release();
//                                 reject(err);
//                             } else {
//                                 connection.release();
//                                 var results = allCategories[0];
//                                 resolve(results);
//                             }
//                         });
//                     }
//                 });
//             });
//         }  

    