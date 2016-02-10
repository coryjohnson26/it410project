const expect = require('chai').expect;
const users = require('../src/users.js');

describe('User management', function(){
	it('creates new user', function(){
		return users.createUser('cory', 'pass')
			.then(function(val){
				expect(val).to.deeply.equal({user:'cory', pass: 'pass'});
			});
	});
});