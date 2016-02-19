const expect = require('chai').expect;
const users = require('../src/users.js');

describe('User management', function(){
    afterEach(function() {
    	return users.clear('testUserName')
    		.then(function(val){
    			return;
    		})
    });

	it('creates new user', function(){
		return users.createUser('testUserName', 'pass')
			.then(function(val){	
				expect(val.result.ok).to.equal(1);	
				expect(val.insertedCount).to.equal(1);
			});
	});

	it('doesn\'t create duplicate user', function(){
		return users.createUser('testUserName', 'pass')
			.then(function(val){	
				return users.createUser('testUserName', 'pass')
					.catch(function(err){
						expect(err).to.equal('User not created');	
					});	
			});
	});

	it('updates user password', function(){
		return users.createUser('testUserName', 'pass')
			.then(function(val){
				return users.updateUser('testUserName', 'newPass')
					.then(function(val){
						expect(val.result.nModified).to.equal(1);
					});
			});
	});

	it('doesn\'t update when user doesn\'t exist', function(){
		return users.createUser('testUserName', 'pass')
			.then(function(val){
				return users.updateUser('john', 'newPass')
					.catch(function(val){
						expect(val).to.equal('User doesn\'t exist');
					});
			});
	});

	it('verifies correct username and password', function(){
		return users.createUser('testUserName', 'pass')
			.then(function(val){
				return users.authUser('testUserName', 'pass')
					.then(function(res){
						expect(res.username).to.equal('testUserName');
						expect(res.password).to.equal('pass');
					});
			});
	});

	it('doesn\'t verify incorrect username', function(){
		return users.createUser('testUserName', 'pass')
			.then(function(val){
				return users.authUser('john', 'pass')
					.catch(function(err){
						expect(err).to.equal('User not verified');
					});
			});
	});

	it('doesn\'t verify incorrect password', function(){
		return users.createUser('testUserName', 'pass')
			.then(function(val){
				return users.authUser('testUserName', 'pass1')
					.catch(function(err){
						expect(err).to.equal('User not verified');
					});
			});
	});

});