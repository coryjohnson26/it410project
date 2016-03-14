(function(){
	angular.module('app').controller('projectCtrl', ['projectService', function(projectService){
		this.project = projectService.getProject();
	}])
})();