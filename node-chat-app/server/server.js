const path = require('path');
// need to configure express to work with this so that
// we can add socket.io support.
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public/');
var app = express();
// http used behind the scenes for Express. When we call
// app.listen, it calls the http method, passing
// in app as the argument for createServer(); http is
// integrated so much that you can just provide app as
// the arg.
var server = http.createServer(app);
// have access to socket.io http server via server variable. 
// we get back a websockets server. Now we can do anything
// we want in terms of emitting or listening to events.
// This is how we are going to communicate between server
// and client.
var io = socketIO(server);
// new instance of Users class
var users = new Users();
app.use(express.static(publicPath));

//lets you register event listener
io.on('connection', (socket) => {
    console.log('New user connected ...');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            // return so that join does not fire if user login data is not valid
            return callback('proper name and room name format are required!');
        }
        socket.join(params.room);
        // to make sure that there aren't already users with the same ID.
        // when a user joins a room, they are removed from any potential previous rooms.
        users.removeUser(socket.id);
        // user is added to new room they just joined.
        users.addUser(socket.id, params.name, params.room);
        console.log(socket.id + ' has connected to the CHAT');
        // io.to emits event to everyone in chat room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.broadcast.emit from Admin text Welcome to chattrbox
        socket.emit('newMessage', generateMessage('admin', 'welcome to chattrbox!'));
        //socket.broadcast.emit from Admin text New user joined chat!
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} just joined the ${params.room} chat!`));
        callback();
    })
    socket.on('typing', (data) => {
        var user = users.getUser(socket.id);
        socket.broadcast.to(user.room).emit('typing', data = `${user.name} is typing ...`);
    })
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        // if uwer sends an empty message or just a bunch of empty spaces
        // it won't get sent to everyone else.
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    })
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, `${coords.latitude}, ${coords.longitude}`));
        }
    })

    socket.on('disconnect', function() {
        const user = users.removeUser(socket.id);
        if (user) {
            // these 2 events make sure that we don't see duplicates in chat area when we refresh page
            // only when someone actually joins a room do we see a new message about joining. however, 
            // does not fix the welcome messge. That repeats with every refresh of the page.
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left the ${user.room} room!`));
        }
        console.log('Disconnected from server ...');
    })
});

// use HTTP server instead of Express server beause of socket.io
server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
})