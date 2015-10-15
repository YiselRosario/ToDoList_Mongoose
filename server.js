var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require("mongoose"); // add 15 oct. // mongoose let us store info but depending on the content.
var app = express();
var port = process.env.PORT || 3000;
require("./models/Todo"); // add 15. oct
mongoose.connect("mongodb://localhost/todolist"); // add 15 oct. //mongodb allows everithing to storage

app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var toDoRoutes = require('./routes/toDoRoutes');    // 2nd step, add this to connect the routes with the server

// added 15-oct-15
app.use(function(req, res, next){
	next(); // next function have a lot of unicorn magic
});

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

//every route is prefix by the first param
app.use('/api/v1/todo', toDoRoutes); // every route is gonna have the same route.
//app.use('/api/v2', otherRoutes); this are examples
//app.use('/api/v1/users', userRoutes);

// added 15-0ct-15
//this is an Error handleling Route. this an global function, any error that I have Its gonna go here and would be fine. All errors all gonna be treated the same. this an built in function in express, error
app.use(function(err, req, res, next){
	if(err.err)console.log("Err:" + err.err);
	else console.log("Err:" + err);
	res.status(400).send(err);
});
//after the o.createToDo in the HomeFactory we do this app.use, before it was app.post
//app.use('/api/v1/todo', )

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});
