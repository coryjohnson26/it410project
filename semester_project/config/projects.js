const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const assert = require('assert');

var mongodb;
var url = 'mongodb://localhost:27017/project';

var connect = function(){
	return new Promise(function(resolve, reject){
		if(mongodb) return resolve(mongodb);
		MongoClient.connect(url, function (err, db) {
			return resolve(db);
		});
	});
}; 

exports.addProject = function(name){
	return connect()
	.then(function(db){
		return exports.findUser(user)
			.then(function(val){
				if(!val) return db.collection('project').insertOne({name: name});
				return new Promise(function(resolve, reject){
					return resolve();
				});
			});
	});
};

exports.updateProject = function(id, name){
	return connect()
	.then(function(db){
		return db.collection('project').update({id: id}, {id: id, name: name}, {upsert: false});
	});
};

exports.findProject = function(name){
	return connect()
	.then(function(db){
		return db.collection('project').findOne({name: name});
	});
};

exports.getProjects = function(){
	return connect()
	.then(function(db){
		return db.collection('project').find();
	})
}

}