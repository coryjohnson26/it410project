(function(){
    var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ngMessages', 'ui.bootstrap']);
    
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode({enabled:true, requireBase : false});

        var isLoggedIn = ['$q', '$http', '$rootScope', '$location', function ($q, $http, $rootScope, $location){
	                 		var deferred = $q.defer()
				           	$http.get('/loggedin').success(function (user){
				           		if (user){
				           			$rootScope.loggedInUser = user.name
				           			$rootScope.loggedIn = true
				           			deferred.resolve()
				           		}else{
				           			deferred.reject()
				           			$rootScope.loggedInUser = null
				           			$rootScope.loggedIn = false
				           			$location.url('/')
				           		}
				           	})
				           	return deferred.promise
		               }];

        $routeProvider
            .when('/', {
            	templateUrl:'views/partials/login.html',
            	controller: 'loginCtrl'
            })
            .when('/register', {
            	templateUrl:'views/partials/register.html',
            	controller: 'regCtrl'
            })
            .when('/home', {
            	templateUrl:'views/partials/home.html',
            	resolve:{
					isLoggedIn: isLoggedIn
				}
            })
            .when('/projects', {
            	templateUrl:'views/partials/projects.html',
            	resolve:{
					isLoggedIn: isLoggedIn
				}
            })
            .when('/create', {
            	templateUrl:'views/partials/create.html',
            	resolve:{
					isLoggedIn: isLoggedIn
				}
            })
            .otherwise({
            	redirectTo:'/home', 
            	templateUrl:'views/partials/home.html'})       
	}]);

	app.service('projectService', ['$http', '$q', function($http, $q){
		var that = this
		this.projects = []
		this.selectedProject = null
		this.getAllProjects = function(){
			var deferred = $q.defer()
			$http.get('/project/viewAll')
			.success(function(data){
				that.projects = data
				deferred.resolve(that.projects)
			})
			return deferred.promise
		}

		this.setProject = function(id){
			for(var i=0; i<this.projects.length; i++){
				if(JSON.stringify(id) === JSON.stringify(this.projects[i]._id)){
					this.selectedProject = this.projects[i];
				}
			}
		}

		this.getProject = function(){
			return this.selectedProject;
		}
	}])

	app.directive('compareTo', function(){
		return {
	        require: "ngModel",
	        scope: {
	            otherModelValue: "=compareTo"
	        },
	        link: function(scope, element, attributes, ngModel) {

	            ngModel.$validators.compareTo = function(modelValue) {
	                return modelValue == scope.otherModelValue
	            }

	            scope.$watch("otherModelValue", function() {
	                ngModel.$validate()
	            })
	        }
	    }
	})

	var showToast = function($mdToast, msg) {
		var toast = $mdToast.simple()
	        .textContent(msg)
	        .action('Dismiss')
  			.highlightAction(true)     			
	        .position('top right')
	    $mdToast.show(toast).then(function(response) {

		})
	}

	app.controller('navCtrl', ['$scope', '$http', '$timeout', '$mdSidenav', '$log', function ($scope, $http, $timeout, $mdSidenav, $log) {
		$scope.toggleLeft = buildDelayedToggler('left');
		/**
		* Supplies a function that will continue to operate until the
		* time is up.
		*/
		function debounce(func, wait, context) {
			var timer;
			return function debounced() {
				var context = $scope,
				args = Array.prototype.slice.call(arguments);
				$timeout.cancel(timer);
				timer = $timeout(function() {
					timer = undefined;
					func.apply(context, args);
				}, wait || 10);
			};
		}
		/**
		* Build handler to open/close a SideNav; when animation finishes
		* report completion in console
		*/
		function buildDelayedToggler(navID) {
			return debounce(function() {
				$mdSidenav(navID)
				.toggle()
			}, 200);
		}
		function buildToggler(navID) {
			return function() {
				$mdSidenav(navID)
				.toggle()
			}
		}
	}])

	app.controller('LeftCtrl', ['$http', '$scope', '$timeout', '$location', '$mdSidenav', '$mdToast', function($http, $scope, $timeout, $location, $mdSidenav, $mdToast) {
    	this.close = function () {
      		$mdSidenav('left').close()
    	}

    	this.goTo = function(url){
    		$mdSidenav('left').close()
    		$location.url(url);
    	}

    	this.logout = function(){
    		$http.put('/user/logout')
    			.success(function(){
    				$mdSidenav('left').close()
    				$location.url('/login')
    				showToast($mdToast, 'Successfully logged out')
    			})
    	}
  	}]);

	app.controller('homeCtrl', ['projectService', '$scope', '$mdDialog', '$location', '$mdDialog', '$mdMedia', function(projectService, $scope, $mdDialog, $location, $mdDialog, $mdMedia){
		this.projects = []
		var that = this
		projectService.getAllProjects().then(function(results){
			that.projects = results
		})

		this.showProject = function(project, ev) {
			projectService.setProject(project._id)
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			$mdDialog.show({
				controller: 'homeCtrl',
				templateUrl: 'views/partials/view.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			})

			$scope.$watch(function() {
				return $mdMedia('xs') || $mdMedia('sm')
				}, function(wantsFullScreen) {
				$scope.customFullscreen = (wantsFullScreen === true)
			})
		};
	}]);

	app.controller('loginCtrl', ['$http', '$location', '$mdToast', function($http, $location, $mdToast){
		
		this.login = function(){
			if(this.email && this.password){
				$http({
					method:'POST',
					url:'/login',
					data: {
					  'email' : this.email,
					  'password' : this.password
					}
				}).success(function(response){
				    if(response === 'invalid'){
				    	showToast($mdToast, 'Invalid credentials')
				    }else{
				    	$location.url('/home')
				    }
				}).error(function(err){
					showToast($mdToast, err)
				})
			}
		}
	}]);

	app.controller('regCtrl', ['$http', '$location', '$mdToast', function($http, $location, $mdToast){
		this.register = function(){
			this.user.email = this.user.email.toLowerCase()
			$http.post('/user/register', {
				user: this.user
			}).success(function(){
				showToast($mdToast, 'Account successfully created')
				$location.url('/login')
			}).error(function(err){
				showToast($mdToast, 'Email already in use')
			})
		}
	}]);

	app.controller('createCtrl', ['$http', '$location', '$mdToast', function($http, $location, $mdToast){
		this.types = [
			{
				name: 'Construction',
				img: '/img/icons/build.svg'
			},
			{
				name: 'Child care',
				img: '/img/icons/child_friendly.svg'
			},
			{
				name: 'Clean-up',
				img: '/img/icons/delete.svg'
			},
			{
				name: 'Food',
				img: '/img/icons/food.svg'
			},
			{
				name: 'Grocery',
				img: '/img/icons/grocery.svg'
			},
			{
				name: 'Home repair',
				img: '/img/icons/home.svg'
			},
			{
				name: 'Helping hand',
				img: '/img/icons/pan_tool.svg'
			},
			{
				name: 'Gardening',
				img: '/img/icons/plant.svg'
			},
			{
				name: 'Other',
				img: '/img/icons/other.svg'
			}
		]

		this.supplies = ['Tools', 'Paint', 'Toys', 'Child care supplies']

		this.project = {
			type: '',
			supplies: ''
		}

		this.addProj = function(){
			$http.post('/project/create', {
				project: this.project
			}).success(function(){
				showToast($mdToast, 'Project successfully created')
				$location.url('/home')
			}).error(function(err){
				console.log(err)
			})
		}
	}]);

	app.controller('viewCtrl', ['projectService', '$scope', '$http', '$mdDialog', '$mdToast', function(projectService, $scope, $http, $mdDialog, $mdToast){
		$scope.project = projectService.getProject()
		if($scope.project.currentVolunteers === undefined){
			$scope.project.currentVolunteers = []
		}
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.volunteer = function(){
			console.log('volunteering!')
			$http.post('/project/volunteer', {
				projectId: $scope.project._id
			}).success(function(result){
				console.log(result)
				showToast($mdToast, 'Successfully volunteered for ' + $scope.project.title)
				$scope.project.currentVolunteers.push(result)
			}).error(function(err){
				showToast($mdToast, err)
			})
		}

	}]);

	app.controller('upcomingCtrl', ['projectService', '$scope', '$mdDialog', '$location', '$mdDialog', '$mdMedia', function(projectService, $scope, $mdDialog, $location, $mdDialog, $mdMedia){

	}]);

	app.controller('projectCtrl', ['projectService', function(projectService){
		this.project = projectService.getProject();
	}]);

})();