const express = require('express')
const path = require('path')
const passport = require('passport')

const router = express.Router()

const userDB = require('../config/users')
const projectsDB = require('../config/projects')
const users = require('../src/users')
const projects = require('../src/projects')

const BCRYPT_ROUNDS = 13

router.get('/', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../dist/views') })
})

router.get('/loggedin', function (req, res) {
	res.send(req.isAuthenticated() ? req.user.username : false)
})

router.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err) }
		if (!user) {
			return res.send('invalid')
		}
		if (user.verified === 0){
			return res.send('unverified')
		}
		req.logIn(user, function (err) {
			if (err) { return next(err) }
			return res.send(user.username)
		})
	})(req, res, next)
})

router.get('/logout', function (req, res){
	console.log(req.user.username + ' logged out')
	if(req.user){ req.logout() }
	res.redirect('/')
})

router.get('*', function (req, res) {
	console.log('catch all', req.originalUrl)
	res.sendFile('index.html', { root: path.join(__dirname, '../dist/views') })
})

module.exports = router
