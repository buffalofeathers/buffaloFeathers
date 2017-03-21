angular.module('p2.directives', [])
.directive('blogPost', function() {
    return {
        templateUrl: 'directives/post.html',
        restrict: 'E',
        scope: {
            blog: '=blogData'
        }
    }
});