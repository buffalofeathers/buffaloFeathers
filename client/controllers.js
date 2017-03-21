angular.module('p2.controllers', [])
.controller('UserListController', ['$scope', 'User', 'UserService', function($scope, User, UserService) {
    UserService.requireLogin();
    $scope.users = User.query();
}])
.controller('LoginController', ['$scope', '$location', 'UserFactory', 'UserService', function($scope, $location, UserFactory, UserService) {
    UserService.me().then(function(me) {
        redirect();
    });
    function redirect() {
        var dest = $location.search().p;
        if(!dest) {
            dest = '/member';
        }
        $location.path(dest).search('p', null).replace();
    }

    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            redirect();
            console.log("logged in");
        }, function(err) {
            console.log(err);
        });
    }
     $scope.logout = function() {
                UserService.logout()
                alert("You have successfully logged out!")
                .then(function() {
                    redirect();
                }, function(err) {
                    console.log(err);
                });
            }
}])
// .controller("LogoutController", ["$scope", "$location", "UserService", function($scope, $location, UserService) {
//    if (confirm("Are you sure you would like to logout?")) {
//        UserService.logout()
//        .then(function() {
//            $location.path("/")
//            alert("You have successfully logged out.")
//        }); 
//    } else {
//     //   $location.path("/");
//        window.history.back();
//    };  
// }])
.controller('HomeController', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
        $scope.toggleDetails = function () {
            console.log('inside toggle details');
            // console.log($scope.questionid);
            if ($scope.showingDetails === true) { // if the clicked product is already showing details
                $scope.showingDetails = false; // make the clicked product not show details
                $scope.detailMode = false; // indicate that we are NOT showing details somewhere on the page
            } else { // the clicked product is not already showing details
                console.log('in else');
                // if ($scope.detailMode !== true) { // if we are NOT showing details anywhere on the page
                console.log('setting showingDetails to true');
                $scope.showingDetails = true; // show details for this product
                console.log($scope.showingDetails);
                $scope.detailMode = true; // indicate that we ARE showing details somewhere on the page
                // }
            }
        };
    }])

.controller('BlogListController', ['$scope', 'SEOService', '$location','PostFactory', function($scope, SEOService, $location,PostFactory) {
    SEOService.setSEO({
        title: 'Blog | Home',
        description: 'This site is designed to showcase how to use passport',
        image: 'http://' + $location.host() + '/images/pizza.png',
        url: $location.absUrl()
    });
    $scope.blogList = PostFactory.query(function() {
        setTimeout(function() {
            window.prerenderReady = true;
        }, 2000);
    }, function(err) {
        console.log(err);
    });
}])

.controller('ComposeController', ['$scope', '$routeParams', 'PostFactory', 'CategoryFactory', 'UserService', 'UserFactory', '$location', function($scope, $routeParams, PostFactory, CategoryFactory, UserService, UserFactory, $location) {    
//     // UserService.requireLogin();
//     UserService.requireAdmin();

     $scope.categories = CategoryFactory.query();
     $scope.users = UserFactory.query();
     $scope.composeBlog = function() {
        console.log('check');
        var data = {
            title: $scope.title,
            content: $scope.blogContent,
            categoryid: $scope.categoryid,
            userid: $scope.userid
        }

        var blogToCreate = new PostFactory(data);
        blogToCreate.$save(function(success) {
            $location.path('/');
        });
    }
}])

.controller('UpdateBlogController', ['$scope', '$routeParams', 'PostFactory', 'CategoryFactory', '$location', function($scope, $routeParams, PostFactory, CategoryFactory, $location) {    
   $scope.single = PostFactory.get({ id: $routeParams.id }, function() {
       $scope.single.categoryid = String($scope.single.categoryid);
   });
   $scope.update = function() {
        $scope.single.$update(function(success) {
            $location.path('/' + $routeParams.id);
        });
    }
    $scope.categories = CategoryFactory.query();
}])

.controller('SingleBlogController', ['$scope', '$routeParams', 'PostFactory', '$location', function($scope, $routeParams, PostFactory, $location) {    
   $scope.single = PostFactory.get({ id: $routeParams.id });
   $scope.update = function() {
        $location.path('/' + $routeParams.id + '/update');
    }

   $scope.promptDelete = function() {
        var confirmDelete = confirm('Would you like to delete this post?');
        if (confirmDelete) {
            $scope.single.$delete(function(success) {
                $location.path('/');
            });
        }
    }
}])
    .controller('MgmtController', ['$scope', '$location', 'User', 'UserService', 'UserFactory', function($scope, $location, User, UserService, UserFactory) {
        UserService.requireAdmin();
        $scope.users = User.query();

        $scope.deleteUser = function(user) {
            var shouldDelete = confirm('are you sure you want to delete this user? All of users blog posts will be deleted')
            if (shouldDelete) {
                console.log('deleting user!');
            }
            // user.$delete(function() {
            //     console.log('deleted!')
            // })         
        }
         $scope.logout = function() {
                console.log('HELP');
                UserService.logout()
                .then(function() {
                    $location.path('/');
                })
            }
    }])
    .controller('CreateUserController', ['$scope', 'User', 'UserService', '$location', function($scope, User, UserService, $location) {
        console.log('here');

        // UserService.requireLogin();
        // UserService.requireAdmin();

        // UserService.requireLogin();
        // UserService.requireAdmin();


        $scope.create = function() {
            if($scope.password !== $scope.confirmPW) {
                alert('Password does not match');
            } else {
                var data = {
                    email: $scope.email,
                    password: $scope.password,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname
                };
                var u = new User(data);
                u.$save(function() {
                $location.path('/member');
                });
                
            };
        };
    }])
    .controller('HomePageController', ['$scope', 'SEOService','$location', 'UserService', function($scope, SEOService, $location, UserService) {
        SEOService.setSEO({
            title: 'Blog | Home',
            description: 'This site is designed to showcase how to use passport',
            image: 'http://' + $location.host() + '/images/pizza.png',
            url: $location.absUrl()
        });
        $scope.logout = function() {
                    console.log('HELP');
                    UserService.logout()
                    .then(function() {
                        $location.path('/');
                    })
                }
    }])
    .controller('DonationController', ['$scope', 'Donation', function($scope, Donation) {
        $scope.chargeCard = function() {
            Stripe.card.createToken({
                number: $scope.cardNumber,
                cvc: $scope.cvc,
                exp_month: $scope.expMonth,
                exp_year: $scope.expYear
            }, function (status, response) {
                if (response.error) {
                    console.log(response.error);
                } else {
                    // everything is ok
                    var token = response.id;
                    var data = {
                        amount: $scope.amount,
                        token: token
                    }
                    var donation = new Donation(data); //Donation is the name of the factory
                    donation.$save(function() {
                        console.log('it worked');
                    });
                }
            });
        }
    }])