angular.module('p2.factories', ['ngResource'])
.factory('User', ['$resource', function($resource) {
    var u = $resource('/api/users/:id');
    return u;
}])

.factory('CategoryFactory', ['$resource', function($resource) {
    var c = $resource('/api/categories/:id');
    return c;
}])

.factory('PostFactory', ['$resource', function($resource) {
    var p = $resource('/api/posts/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
    });
    return p;
}]) 

.factory('UserFactory', ['$resource', function($resource) {
    return $resource('/api/users/:id', { id: '@id' }, {
        update: { method: 'PUT'}
    })
}])

.factory('Donation', ['$resource', function($resource) {
    return $resource('/api/donations/:id');
}]);
