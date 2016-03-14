(function(){
	angular.module('app').controller('homeCtrl', ['projectService', function(projectService){
		this.projects = projectService.getAllProjects()

		this.selectProject = function(id){
			projectService.setProject(id)
		}

	}])
})();