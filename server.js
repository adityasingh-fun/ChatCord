const path = require('path');    // Node JS core module
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')

const app = express();
// Method create server is used by express but we want to access directly in order to use socket.io
const server = http.createServer(app);
const io = socketio(server);

// Set static folder(we will set the public folder as static folder so that we can access our frotend)
app.use(express.static(path.join(__dirname,'public')));

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection',socket =>{
    console.log('New website connection');

    // Emits message to the client 
    // socket.emit emits to single client that is connected
    socket.emit('message',formatMessage(botName,'Welcome to chatCord'));     // we will catch this message in main.js 

    // Broadcast when a user connects
    // socket.broadcast.emit will emit to everyone except the connected user
    socket.broadcast.emit('message',formatMessage(botName, 'A user has joined the chat'));
    
    // Runs when client disconnects
    socket.on('disconnect',()=>{
        // io.emit emits to every single user
        io.emit('message',formatMessage(botName,'A user has left the chat'));
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg)=>{
        console.log(msg);
        io.emit('message',formatMessage('User',msg))
    })
});


server.listen(process.env.PORT || 3000, function(){
    console.log('Express app running at port ' + (process.env.PORT || 3000))
});