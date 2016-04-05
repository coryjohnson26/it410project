const express = require('express')
const path = require('path')
const passport = require('passport')

const router = express.Router()
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

router.post('/project/view', auth, function(req, res){
	projects.getProjectById(req.body.projectId)
	.then(function(result){
		if(JSON.stringify(req.user._id) === JSON.stringify(result.userId)){
			result.isOwner = true
		}
		if(result){return res.json(result)}
		res.sendStatus(400)
	})
})

router.post('/project/create', auth, function(req,res){
	if(req.body.project.type === '') req.body.project.type = 'img/icons/other'
	req.body.project.description = req.body.project.description.replace(/[\r\n]/g, '')
	projects.createProject(req.body.project, req.user)
	.then(function(result){
		if(result){return res.sendStatus(200)}
		res.sendStatus(400)
	})
})

router.post('/project/volunteer', auth, function(req, res){
	projects.addVolunteer(req.body.projectId, req.user)
	.then(function(result){
		if(result){return res.json(req.user)}
		res.sendStatus(400)
	})
})

module.exports = router