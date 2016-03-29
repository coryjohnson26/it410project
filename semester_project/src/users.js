const db = require('../config/users');
const Promise = require('bluebird');

exports.createUser = function(user){
	return db.addUser(user);
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

exports.findUserById = function(id){
	return db.findUserById(id);
}

exports.clear = function(username){
	return db.remove(username);
}