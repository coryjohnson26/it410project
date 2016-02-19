const express = require('express')
const router = express.Router()
const passport = require('passport')
const users = require('../src/users')

router.get('/services/user', function(req, res){
	if(req.user) res.send(req.user.username)
	else res.send('Not authenticated')
})

router.post('/services/user', function(req, res){
	var username = req.body.username
	var password = req.body.password
	users.createUser(username, password)
		.then(function(val){
			res.send('User created successfully')
		})
		.catch(function(err){
			res.send('Error: ' + err);
		})
})

router.put('/services/user', function(req, res){
	var username = req.body.username
	var password = req.body.password
	users.createUser(username, password)
		.then(function(val){
			res.send('User created successfully')
		})
		.catch(function(err){
			if(req.user && req.user.username === username){
				users.updateUser(username, password)
					.then(function(val){
						res.send('User updated successfully')
					})
					.catch(function(err){
						res.send(err)
					})
			}
			else res.send('User not authenticated')
		})
})

router.put('/services/login', passport.authenticate('local'), function(req, res, next){
	res.send('You are authenticated, ' + req.user.username)
})

router.put('/services/logout', function(req, res){
	req.logout()
	res.send('User logged out')
})

module.exports = router