const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const assert = require('assert');

var mongodb;
var url = 'mongodb://localhost:27017/userManagement';

var connect = function(){
	MongoClient.connect(url, function (err, db) {
		assert(err, null);
		mongodb = db;
	});
}

exports.addUser = function(user, pass){
	connect();
	return new Promise(function(resolve, reject){
		mongodb.collection('users').insertOne({user: user, pass: pass}, function(err, record){
			if(err) return reject(err);
			return resolve(record);
		});
	});
};

exports.updateUser = function(user, pass){
	return new Promise(function(resolve, reject){
		mongodb.collection('users').insertOne({user: user}, {$set: {pass: pass}}, function(err, record){
			if(err) return reject(err);
			return resolve(record);
		});
	});
};

exports.getUser = function(user, pass){
	return new Promise(function(resolve, reject){
		mongodb.collection('users').findOne({user: user, pass: pass}, function(err, record){
			if(err) return reject(err);
			return resolve(record);
		});			
	})
};