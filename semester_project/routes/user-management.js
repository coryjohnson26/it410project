const express = require('express')
const router = express.Router()
const passport = require('passport')
const users = require('../server/users')
const path = require('path')

/**
	Not authenticated === 100
	User created === 200
	Error === 300
	User updated === 400
	Logged in === 500
	Logged out === 600
*/

router.get('/services/user', function(req, res){
	if(req.user) res.send(req.user.username)
	else res.send(100)
})

router.post('/services/user', function(req, res){
	var username = req.body.username
	var password = req.body.password
	users.createUser(username, password)
		.then(function(val){
			res.send(200)
		})
		.catch(function(err){
			res.send(300);
		})
})

router.put('/services/user', function(req, res){
	var username = req.body.username
	var password = req.body.password
	users.createUser(username, password)
		.then(function(val){
			res.send(200)
		})
		.catch(function(err){
			if(req.user && req.user.username === username){
				users.updateUser(username, password)
					.then(function(val){
						res.send(400)
					})
					.catch(function(err){
						res.send(300)
					})
			}
			else res.send('User not authenticated')
		})
})

router.put('/services/login', passport.authenticate('local'), function(req, res, next){
	res.send(500)
})

router.put('/services/logout', function(req, res){
	req.logout()
	res.send(600)
})

router.get('*', function(req, res){
    res.sendFile('index.html', {root:path.join(__dirname, '../dist/')})
})

module.exports = router