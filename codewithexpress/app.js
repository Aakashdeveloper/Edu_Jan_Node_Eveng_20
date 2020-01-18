var express = require('express');
var app = express();
var port = process.env.port || 8800;
var morgan = require('morgan');
var chalk = require('chalk');


var menu = [
    {name:'Home', link:'/'},
    {name:'Movies', link:'/movies'},
    {name:'Products', link:'/products'}
]

var moviesRouter = require('./src/routes/moviesRoute')(menu);
var productRouter = require('./src/routes/productRoute')(menu);

app.use(morgan('dev'));
//static file path
app.use(express.static(__dirname+'/public'))
//View files
app.set('views', './src/views');
//View engine
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
   // res.send("This is from express");
   res.render('index',{title:'Home Page', menu:menu})
});

app.use('/movies',moviesRouter);
app.use('/products',productRouter);

app.listen(port,function(err){
    if(err) throw err
    console.log(`${chalk.gray(`Server is running on port ${port}`)}`)
});
