const express = require('express')
const path = require('path')
const passport = require('passport')

const router = express.Router()

const userDB = require('../config/users')
const projectsDB = require('../config/projects')
const users = require('../src/users')
const projects = require('../src/projects')

var auth = function (req, res, next){
	if (req.isAuthenticated()){
		return next()
	}
	res.sendStatus(401)
}

router.get('/project/viewAll', auth, function(req, res){
	projects.getAllProjects()
	.then(function(result){
		if(result){return res.json(result)}
		res.sendStatus(400)
	})
})

module.exports = router