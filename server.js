const path = require('path');    // Node JS core module
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const app = express();
// Method create server is used by express but we want to access directly in order to use socket.io
const server = http.createServer(app);
const io = socketio(server);

// Set static folder(we will set the public folder as static folder so that we can access our frotend)
app.use(express.static(path.join(__dirname,'public')));

// Run when client connects
io.on('connection',socket =>{
    console.log('New website connection');
});

server.listen(process.env.PORT || 3000, function(){
    console.log('Express app running at port ' + (process.env.PORT || 3000))
});