const db = require('../config/users');
const Promise = require('bluebird');

exports.createUser = function(user, pass){
	return db.addUser(user,pass);
};

exports.updateUser = function(user, pass){
	return db.updateUser(user,pass);
};

exports.authUser = function(user, pass){
	return db.verifyUser(user,pass);
};

exports.findUser = function(user){
	return db.findUser(user);
};

exports.clear = function(username){
	return db.remove(username);
}