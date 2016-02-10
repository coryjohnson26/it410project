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
	return new Promise(function(resolve, reject){
		db.updateUser(user,pass)
			.then(function(val){
				if(val.nModified === 0)return reject('User doesn\'t exist')
				return resolve(val);
			})
			.catch(function(err){
				return reject(err);
			});
	});
};

exports.authUser = function(user, pass){
	return new Promise(function(resolve, reject){
		db.verifyUser(user,pass)
			.then(function(val){
				return resolve(val);
			})
			.catch(function(err){
				return reject(err);
			});
	});
};

exports.clearAll = function(){
	return new Promise(function(resolve, reject){
	db.removeAll()
		.then(function(val){
			if(!val) return reject('deletion failed');
			return resolve(val);
		})
		.catch(function(err){
			return reject(err);
		});
	});
}