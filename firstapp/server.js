var http = require('http');

var server = http.createServer(function(req,res){
    res.write("<h1>Hi, This is Node Js app</h1>");
    res.end();
})

server.listen(5600)