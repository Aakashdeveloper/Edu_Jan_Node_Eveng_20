var express = require('express');
var moviesRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"

function router(menu){

    moviesRouter.route('/')
        .get( function(req,res){
            mongodb.connect(url, function(err,dc){
                if(err){
                    res.status(501).send('Error while connecting')
                }else{
                    var dbo = dc.db('classdatabase');
                    dbo.collection('movies').find({}).toArray(function(err,data){
                        if(err){
                            res.status(501).send('Error fetching data')
                        }else{
                            res.render('movies',{title:'Movies Page',movie:data,menu})
                        };
                    });
                };
            });
    });

    moviesRouter.route('/details/:id')
        .get(function(req,res){
            //var id = req.params.id;
            var {id} = req.params
            mongodb.connect(url, function(err,dc){
                if(err){
                    res.status(501).send('Error while connecting')
                }else{
                    var dbo = dc.db('classdatabase');
                    dbo.collection('movies').findOne({_id:id}, function(err,data){
                        if(err){
                            res.status(501).send('Error fetching data')
                        }else{
                            res.render('moviesDetails',{title:'Movies Page',movie:data,menu})
                        };
                    });
                };
            });
    });

    return moviesRouter
}


module.exports = router;