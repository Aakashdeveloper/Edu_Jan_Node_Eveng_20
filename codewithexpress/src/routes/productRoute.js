var express = require('express');
var productRouter = express.Router();
var fs = require('fs');

productRouter.route('/')
    .get(function(req,res){
        fs.readFile('prod.json','utf-8',function(err,data){
            if(err) throw err;
            res.send(data);
        })
    });

productRouter.route('/details')
    .get(function(req,res){
        res.send('Product Detail Page');
    })


module.exports = productRouter;