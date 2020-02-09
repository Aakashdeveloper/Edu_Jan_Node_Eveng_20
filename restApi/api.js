const express = require('express');
const app = express();
const port = 7800;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const mongourl = "mongodb://localhost:27017";
let db;
let col_name = "eduJan";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Nothing')
})

//Create (Post Call)
app.post('/addUser',(req,res) => {
    db.collection(col_name).insert(req.body,(err,result) =>{
        if(err) {
            res.status(401).send('Error in inserting')
        }else{
            res.send('Data Added')
        };
    });
});

//Read (Get Call)
app.get('/user', (req,res) => {
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err) {
            res.status(401).send('Error in Fetching')
        }else{
            res.send(result)
        };
    });
});


//Update (Put Call)
app.put('/updateUser',(req,res) => {
    db.collection(col_name)
        .findOneAndUpdate({'id':req.body.id},{
            $set:{
                id:req.body.id,
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                active:req.body.active,
            }
        },(err,result) => {
            if(err){
                res.status(401).send('Error in Updating')
            }else{
                res.send("Data Updated")
            }
        });
});

//Delete (Delete Call)
app.delete('/deleteUser', (req,res) => {
    db.collection(col_name).findOneAndDelete({
        "id":req.body.id
    },(err,result) => {
        if(err){
            res.status(401).send('Error in Deleting')
        }else{
            res.send("Data Deleted")
        }
    });
});



MongoClient.connect(mongourl,(err,client) => {
    if(err) console.log("Error while connecting");
    db = client.db('classpractice');
    app.listen(port,(err) => {
        console.log(`Server listing to port ${port}`)
    })
})
