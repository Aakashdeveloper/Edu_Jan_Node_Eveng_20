var http = require('http');
var url = require('url');

http.createServer(function(req,res){
    var myquery = url.parse(req.url,true);
    res.write(myquery.href);
    res.end();
}).listen(7800)