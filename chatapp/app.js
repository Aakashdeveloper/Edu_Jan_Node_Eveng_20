var express = require('express'), 
    http = require('http'), 
    path = require('path')
    io = require('socket.io');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

// Set up express
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// Set up socket.io
var io = require('socket.io').listen(server);

// Handle socket traffic
io.sockets.on('connection', function (socket) {
    socket.on('nick', function(nick) {
        socket.nickname =nick;
    });


    // Relay chat data to all clients
    socket.on('chat', function(data) {
        console.log(data)

            var nickname = socket.nickname;

            var payload = {
                message: data.message,
                nick: nickname
            };

            socket.emit('chat',payload);
            socket.broadcast.emit('chat', payload);
    });
});