const db = require('../config/projects');
const Promise = require('bluebird');

exports.createProject = function(name){
	return db.addProject(name);
};

exports.updateProject = function(name){
	return db.updateProject(name);
};

exports.findProject = function(name){
	return db.findProject(name);
};

exports.getAllProjects = function(){
	return db.getProjects();
}