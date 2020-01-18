var express = require('express');
var app = express();
var port = 9600;
var request = require('request');

app.use(express.static(__dirname+'/public'));
app.set('views' ,'./src/views');
app.set('view engine','ejs');

var apiurl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29';

app.get('/weather', function(req,res){
    request(apiurl,(err,response) => {
        if(err) throw err;
       // res.send(response.body)
       var output = JSON.parse(response.body)
       res.render('index',{title:'Weather App', result:output});
    })
})

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})