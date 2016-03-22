const express = require('express')
const path = require('path')
const passport = require('passport')

const router = express.Router()

const userDB = require('../config/users')
const projectsDB = require('../config/projects')
const users = require('../src/users')
const projects = require('../src/projects')

const BCRYPT_ROUNDS = 13



module.exports = router