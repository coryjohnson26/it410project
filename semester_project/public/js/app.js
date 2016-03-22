(function(){
    var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ngMessages', 'ui.bootstrap']);
    
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        var isLoggedIn = function ($q, $http, $location){
			var deferred = $q.defer()
			$http.get('/loggedin').success(function (email){
				if (email){
					deferred.resolve()
				}else{
					deferred.reject()
					$location.url('/')
				}
			})
			return deferred.promise
		}

        $locationProvider.html5Mode({enabled:true, requireBase : false});

        $routeProvider
            .when('/', {
            	templateUrl:'views/partials/login.html',
            	controller: 'homeCtrl'
            })
            .when('/home', {
            	templateUrl:'views/partials/home.html',
            	resolve:{
					isLoggedIn: isLoggedIn
				}
            })
            .when('/projects', {
            	templateUrl:'views/partials/projects.html',
            	controller: 'projectCtrl'/*,
            	resolve:{
					isLoggedIn: isLoggedIn
				}*/
            })
            .otherwise({
            	redirectTo:'/home', 
            	templateUrl:'views/partials/home.html'})
           
	}]);

	app.service('projectService', function(){
		this.projects = [
			{
				id: 0,
				title: 'Rebuild home 1',
				description: 'This is just a short description explaining the project',
				color: 'purple',
				link: ''
			},
			{
				id: 1,
				title: 'Rebuild home 2',
				description: 'This is just a short description explaining the project',
				color: 'blue'
			},
			{
				id: 2,
				title: 'Rebuild home 3',
				description: 'This is just a short description explaining the project',
				color: 'yellow'
			},
			{
				id: 3,
				title: 'Rebuild home 4',
				description: 'This is just a short description explaining the project',
				color: 'green'
			},
			{
				id: 4,
				title: 'Rebuild home 5',
				description: 'This is just a short description explaining the project',
				color: 'gray'
			},
			{
				id: 5,
				title: 'Rebuild home 6',
				description: 'This is just a short description explaining the project',
				color: 'red'
			},
			{
				id: 6,
				title: 'Rebuild home 7',
				description: 'This is just a short description explaining the project',
				color: 'purple'
			},
			{
				id: 7,
				title: 'Rebuild home 8',
				description: 'This is just a short description explaining the project',
				color: 'blue'
			},
			{
				id: 8,
				title: 'Rebuild home 9',
				description: 'This is just a short description explaining the project',
				color: 'yellow'
			}
		]
		this.selectedProject = this.projects[0];

		this.getAllProjects = function(){
			return this.projects;
		}

		this.setProject = function(id){
			this.selectedProject = this.projects[id];
		}

		this.getProject = function(){
			return this.selectedProject;
		}
	})

	app.controller('homeCtrl', ['projectService', function(projectService){
		this.projects = projectService.getAllProjects()

		this.selectProject = function(id){
			projectService.setProject(id)
		}

	}]);

	app.controller('projectCtrl', ['projectService', function(projectService){
		this.project = projectService.getProject();
	}]);

})();