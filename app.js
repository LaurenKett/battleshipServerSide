// Create the server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Route handler
app.get('/', function (req, res) {
  // res.send('<h1>Hello World!</h1>');
  res.sendFile(__dirname + '/index.html');
});

// Listen on 'connection' event for incoming sockets
io.on('connection', function (socket) {
  console.log('a user connected!');
  // Fires disconnect event
  socket.on('disconnect', function () {
    console.log('user disconnected.');
  });
  // Fires 'chat-message' event
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    // Send event to everyone
    io.emit('chat message', msg);
  });

});

server.listen(3000, function() {
  console.log("server up");
});
