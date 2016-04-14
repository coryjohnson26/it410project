require('dotenv').config()
const express   = require('express')
const http = require('http')
const https = require('https')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt-nodejs')
const session = require('express-session')
const Q = require('q')
const async = require('async-q')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const favicon = require('serve-favicon')
const app   = express()
const users = require('./src/users')

const port = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('projectServiceSecretiveSecret'))
app.use(session({
    secret: 'projectServiceSecretiveSecret',
    duration: 1 * 60 * 60 * 1000,
    cookie: {
        ephemeral: false,
        httpOnly: true,
        secure: false
    },
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(favicon(__dirname + '/dist/img/favicon.ico'))

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
function (email, password, done) {
    email = email.toLowerCase()
    users.findUser(email).then( function (data){
        if(!data){
            return done(null, false)
        }
        bcrypt.compare(password, data.password, function (err, res) {
            if(res){
                return done(null, { _id: data._id, email: data.email, name:data.firstName + ' ' + data.lastName })
            }
            done(null, false)
        })
    })
}))
passport.serializeUser(function (user, done) {
    done(null, user._id)
})
passport.deserializeUser(function (id, done) {
    users.findUserById(id).then(function (user){
        done(null, { _id: user._id, email: user.email, name:user.firstName + ' ' + user.lastName})
    })
})

app.all('/project/*', require('./controllers/projectRoutes'))
app.all('/user/*', require('./controllers/userRoutes'))
app.use(express.static(__dirname + '/dist'))
app.all('/*', require('./controllers/routes'))

http.createServer(app).listen(port, function (){
    console.log('SERVER STARTED ' + port)
})
