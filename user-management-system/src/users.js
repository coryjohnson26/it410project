const db = require('../config/mongodb');
const Promise = require('bluebird');

exports.createUser = function(user, pass){
	return new Promise(function(resolve, reject){
		db.addUser(user,pass)
			.then(function(val){
				if(!val) return reject('User not created');
				return resolve(val);
			})
			.catch(function(err){
				return reject(err);
			});
	});
};

exports.updateUser = function(user, pass){

};

exports.authUser = function(user, pass){

};
