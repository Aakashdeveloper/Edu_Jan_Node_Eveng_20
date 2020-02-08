import express from 'express';
import path from 'path';
import http from 'http';

//const LocalStorage = require('node-localstorage').LocalStorage;
//let localstorage = new LocalStorage('./scratch');
//const iplocate = require('node-iplocate');
//const publicIP = require('public-ip');
let io = require('socket.io');
let app = express();

app.configure(() => {
        app.set('port', process.env.PORT || 6700);
        app.use(express.static(path.join(__dirname, 'public')));
    });


app.configure('development', () => {
    app.use(express.errorHandler());
})

let server = http.createServer(app).listen(app.get('port'),()=> {
    console.log('Server is running')
});

io = require('socket.io').listen(server);

io.socket.on('connection', (socker) => {
    socket.on('nick', (nick) => {
        socket.set('nickname', nick);
    });

    socket.on('chat', (data) => {
        socker.get('nickname',(err,nick) => {
            let  nickname = err ? 'Anonymous': nick;

            let payload = {
                message: data.message,
                nick:nickname
            };

            socket.emit('chat', payload);
            socket.broadcast.emit('chat', payload)
        })
    })
})