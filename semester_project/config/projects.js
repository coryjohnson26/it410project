const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')
const Promise = require('bluebird')
const assert = require('assert')

var mongodb;
var url = 'mongodb://localhost:27017/project';

var connect = function(){
	return new Promise(function(resolve, reject){
		if(mongodb) return resolve(mongodb);
		MongoClient.connect(url, function (err, db) {
			return resolve(db)
		})
	})
}

exports.addProject = function(project){
	return connect()
	.then(function(db){
		return db.collection('project').insertOne({title: project.title
													, description: project.description
													, address: project.address
													, date: project.date
													, beginTime: project.beginTime
													, endTime: project.endTime
													, type: project.type})
	})
}

exports.updateProject = function(id, name){
	return connect()
	.then(function(db){
		return db.collection('project').update({id: id}, {id: id, name: name}, {upsert: false});
	})
}

exports.findProject = function(name){
	return connect()
	.then(function(db){
		return db.collection('project').findOne({name: name});
	})
}

exports.findProjectById = function(id){
	return connect()
	.then(function(db){
		return db.collection('project').findOne({_id: new mongo.ObjectID(id)})
	})
}

exports.getProjects = function(){
	return connect()
	.then(function(db){
		return db.collection('project').find({}).toArray();
	})
}