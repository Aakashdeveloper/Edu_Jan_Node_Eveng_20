var express = require('express');
var app = express();
var port = process.env.port || 9800;
var moviesRouter = require('./src/routes/moviesRoute');
var productRouter = require('./src/routes/productRoute');

app.get('/', function(req,res) {
    res.send("This is from express");
});

app.use('/movies',moviesRouter);
app.use('/products',productRouter);

app.listen(port,function(err){
    if(err) throw err
    console.log("Server is running on port 9800")
});
