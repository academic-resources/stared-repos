var path = require("path");

var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var routes = require('./routes/index.js')(app);

var server = app.listen(8000, function(){
	console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

var users = {};
var messages = [];
io.sockets.on('connection', function(socket){
	console.log("We have connected to our socket");

	socketID = socket.id;

	io.sockets.emit('msg', messages);

	socket.on('login', function(data){
		console.log(data.user);
		users[socketID] = data.user;
		console.log(users);
		socket.broadcast.emit('newUser', data);
	});
	socket.on('newMessage', function(data){
		console.log(data.name + " says " + data.message);
		messages.push(data);
		io.sockets.emit('msg', messages);
	});
	socket.on('disconnect', function(data){
		var message = users[socketID] + " has just logged out.";
		delete users[socketID];
		socket.broadcast.emit('logout', {message: message});
	});
});