const db = require('../config/projects');
const Promise = require('bluebird');

exports.createProject = function(project, user){
	return db.addProject(project, user)
}

exports.updateProject = function(name){
	return db.updateProject(name)
}

exports.findProject = function(name){
	return db.findProject(name)
}

exports.getProjectById = function(id){
	return db.findProjectById(id)
}

exports.getAllProjects = function(){
	return db.getProjects()
}

exports.addVolunteer = function(id, person){
	return db.addVolunteer(id, person)
}