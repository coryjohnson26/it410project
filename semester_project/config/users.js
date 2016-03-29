const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const Promise = require('bluebird')
const assert = require('assert')
const bcrypt = require('bcrypt-nodejs')

const BCRYPT_ROUNDS = 10

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

exports.addUser = function(user){
	return connect()
	.then(function(db){
		return exports.findUser(user.email)
			.then(function(val){
				if(!val){
					return new Promise(function(resolve,reject){
						bcrypt.genSalt(BCRYPT_ROUNDS, function(salt){
							bcrypt.hash(user.password, salt, null, function(err, hash){
								if(err)reject(err)
								return resolve(db.collection('user')
									.insertOne({
										email: user.email, 
										password: hash, 
										firstName: user.firstName, 
										lastName: user.lastName}))
							})
						})
					})
				} 
				return new Promise(function(resolve, reject){
					return resolve('already exists');
				});
			});
	});
};

exports.updateUser = function(user, pass){
	return connect()
	.then(function(db){
		return db.collection('user').update({email: user}, {email: user, password: pass}, {upsert: false});
	});
};

exports.findUser = function(email){
	return connect()
	.then(function(db){
		return db.collection('user').findOne({email: email});
	});
};

exports.findUserById = function(id){
	return connect()
	.then(function(db){
		return db.collection('user').findOne({_id: new mongo.ObjectID(id)});
	});	
};

exports.verifyUser = function(user, pass){
	return connect()
	.then(function(db){
		return db.collection('user').findOne({email: user, password: pass});
	});
};

exports.remove = function(user){
	return connect()
	.then(function(db){
		return db.collection('user').remove({email: user});
	});
}