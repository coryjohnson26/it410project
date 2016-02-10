const express = require('express')
const bodyParser = require('body-parser')
var app = express()

var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
	res.send('get')
})

app.listen(port, function(){
	console.log('Example app listening on port ' + port)
})