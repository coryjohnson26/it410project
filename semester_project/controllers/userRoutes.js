const express = require('express')
const router = express.Router()
const passport = require('passport')
const users = require('../src/users')
const path = require('path')

router.get('/user/getUser', function(req, res){
	if(req.user) res.send(req.user.username)
	else res.send(100)
})

router.post('/user/register', function(req, res){
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

router.put('/user/authUser', function(req, res){
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

router.put('/user/login', passport.authenticate('local'), function(req, res, next){
	res.send(500)
})

router.put('/user/logout', function(req, res){
	req.logout()
	res.send(600)
})

module.exports = router