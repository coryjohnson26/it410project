const express = require('express')
const path = require('path')
const passport = require('passport')

const router = express.Router()

const userDB = require('../config/users')
const projectsDB = require('../config/projects')
const users = require('../src/users')
const projects = require('../src/projects')

router.get('/', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../dist/views') })
})

router.get('/loggedin', function (req, res) {
	res.send(req.isAuthenticated() ? req.user : false)
})

router.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err) }
		if (!user) {
			return res.send('invalid')
		}
		req.logIn(user, function (err) {
			if (err) { return next(err) }
			return res.send(user.name)
		})
	})(req, res, next)
})

router.get('/logout', function (req, res){
	if(req.user){ 
		req.logout()
		res.sendStatus(200)
	}
})

router.get('*', function (req, res) {
	console.log('catch all', req.originalUrl)
	res.sendFile('index.html', { root: path.join(__dirname, '../dist/views') })
})

module.exports = router
