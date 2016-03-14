(function(){
    var app = angular.module('app', ['ngMaterial', 'ngRoute']);
    
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
            $routeProvider
                .when('/home', {templateUrl:'partials/home.html'})
                .when('/login', {templateUrl:'partials/login.html'})
                .when('/projects', {templateUrl:'partials/projects.html'})
                .otherwise({redirectTo:'/home', templateUrl:'partials/home.html'})
            $locationProvider.html5Mode(true)
	}]);
})();