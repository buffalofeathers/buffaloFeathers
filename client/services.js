angular.module('p2.services', [])
.service('UserService', ['$http', '$location', function($http, $location) {

    var user;

    this.isLoggedIn = function() {
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    this.requireLogin = function() {
        if (!this.isLoggedIn()) {
            var current = $location.path();
            $location.path('/login').search('p', current);
        }
    }

    this.isAdmin = function() {
        // if (user && user.role === 'admin') {
        //     return true;
        // } else {
        //     return false;
        // }
        return this.me().then(function(me) {
            if (me && me.role === "admin") {
                return true;
            } else {
                return false;
            }
        }, function(err) {
            return false;
        });
    }

    this.requireAdmin = function() {
        return this.isAdmin().then(function(thisUserIsAnAdmin){
            if (!thisUserIsAnAdmin) {
                $location.path('/login').replace();
            }
        })
    }

    // this.requireAdmin = function() {
    //     console.log(this.isAdmin());
    //     if(!this.isAdmin()) {
    //         // $location.path('/').replace();
    //     }
    // }

    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: '/api/users/login',
            data: {
                email: email,
                password: password
            }
        }).then(function(success){
            user = success.data;
            return success.data;
        })
    }

    this.logout = function() {
        return $http({
            method: 'GET',
            url: '/api/users/logout'
        }).then(function(success) {
            user = undefined;
            alert('You are now logged out');
        });
    }

    this.me = function() {
        if (user) {
            return Promise.resolve(user);
        } else {
            return $http({
                method: 'GET',
                url: '/api/users/me'
            }).then(function(success) {
                user = success.data;
                return success.data;
            })
        }
    }
}])

.service('SEOService', ['$rootScope', function($rootScope) {
    this.setSEO = function(seoObj) {
        $rootScope.seo = {};
        for(var prop in seoObj) {
            $rootScope.seo[prop] = seoObj[prop]; //this is copying seoObj to rootscope
        }
    }
}])