const app = require('./app');
const express = require('express');
const port = 6700;
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res) => {
    res.render('index',{msg:req.query.msg?req.query.msg:''})
})
app.listen(port, () => {
    console.log(`Server iis running on port ${port}`)
});

