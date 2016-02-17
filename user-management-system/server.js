const express = require('express')
const bodyParser = require('body-parser')
var app = express()

var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/services/user', function(req, res){
	res.send('get user')
})

app.post('/services/user', function(req, res){
	res.send('post user')
})

app.put('/services/user', function(req, res){
	res.send('put user')
})

app.put('/services/login', function(req, res){
	res.send('put login')
})

app.put('/services/logout', function(req, res){
	res.send('put logout')
})


app.listen(port, function(){
	console.log('Example app listening on port ' + port)
})