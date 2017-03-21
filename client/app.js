angular.module('p2',['ngResource','ngRoute', 'p2.controllers', 'p2.factories', 'p2.services', 'p2.directives'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
     .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/create', {
        templateUrl: 'views/createuser.html',
        controller: 'CreateUserController'
    })
    .when('/member', {
        templateUrl: 'views/member.html'

    })
    // .when('/', {
    //     templateUrl: 'views/blog.html',
    //     controller: 'BlogListController'
    // })
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
    .when('/music', {
        templateUrl: 'views/music.html'
        
    })
    .when('/jp', {
        templateUrl: 'views/jp.html'

    })
    .when('/code', {
        templateUrl: 'views/code.html'
        
    })
    .when('/literature', {
        templateUrl: 'views/literature.html'
        
    })
    .when('/interests', {
        templateUrl: 'views/interests.html'
       
    })
    .when('/resume', {
        templateUrl: 'views/resume.html'
       
    })
    .when('/donate', {
        templateUrl: 'views/donate.html',
        controller: 'DonationController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeController'
    })
    
    .when('/users', {
        templateUrl: 'views/mgmt.html',
        controller: 'MgmtController'
    })
    .when('/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdateBlogController'
    })
    .when('/:id', {
        templateUrl: 'views/single_blog.html',
        controller: 'SingleBlogController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);