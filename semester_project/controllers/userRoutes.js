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
	var user = req.body.user
	users.createUser(user)
		.then(function(result){
			if(result === 'already exists'){
				res.sendStatus(409)
			}else{
				res.sendStatus(result ? 200 : 400)
			}
		})
})

router.put('/user/logout', function(req, res){
	req.logout()
	res.sendStatus(200)
})

module.exports = router