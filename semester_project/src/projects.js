const db = require('../config/projects');
const Promise = require('bluebird');

exports.createProject = function(project){
	return db.addProject(project);
};

exports.updateProject = function(name){
	return db.updateProject(name);
};

exports.findProject = function(name){
	return db.findProject(name);
};

exports.getProjectById = function(id){
	return db.findProjectById(id);
}

exports.getAllProjects = function(){
	return db.getProjects();
};