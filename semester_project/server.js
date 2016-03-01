const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const users = require('./server/users')
const session = require('express-session');

var app = express()

var port = process.env.PORT || 3000

// tell passport to use a local strategy and tell it how to validate a username and password
passport.use(new LocalStrategy(function(username, password, done) {
    users.authUser(username, password)
    	.then(function(val){
    		return done(null, val)
    	})
    	.catch(function(err){
    		return done(null, false)
    	})
}))

// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser(function(user, done) {
    done(null, user.username)
})

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(username, done) {
	users.findUser(username)
		.then(function(user){
			done(null, user)
		})
})

// tell the express app what middleware to use
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(__dirname + '/dist'))
app.use('/', require('./routes/user-management'))

app.listen(port, function(){
	console.log('listening on port ' + port)
})