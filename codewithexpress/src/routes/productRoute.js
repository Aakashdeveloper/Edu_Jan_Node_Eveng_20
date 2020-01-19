var express = require('express');
var productRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"

function router(menu){

    productRouter.route('/')
        .get(function(req,res){
            mongodb.connect(url, function(err,dc){
                if(err){
                    res.status(501).send('Error while connecting')
                }else{
                    var dbo = dc.db('classdatabase');
                    dbo.collection('products').find({}).toArray(function(err,data){
                        if(err){
                            res.status(501).send('Error fetching data')
                        }else{
                            res.render('product',{title:'Products Page',prod:data,
                                menu})
                        };
                    });
                };
            });
            
        });




    productRouter.route('/details')
        .get(function(req,res){
            res.send('Product Detail Page');
        })
    
    return productRouter
}

module.exports = router;
