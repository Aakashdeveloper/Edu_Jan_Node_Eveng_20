import express from 'express'
import mongo from 'mongodb';
import bodyParser from 'body-parser';
const app = express();
const port = 7800;
const MongoClient = mongo.MongoClient;
const mongourl = "mongodb://localhost:27017";
let db;
let col_name = "eduJan";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))
//View files
app.set('views', './src/views');
//View engine
app.set('view engine', 'ejs');


app.get('/health',(req,res) => {
    res.status(200).send('Api  is workng')
})

//Create (Post Call)
app.post('/addUser',(req,res) => {
    var id = Math.floor(Math.random()*10000)
    var data = {
        id:id,
        name:req.body.name,
        city:req.body.city,
        phone:req.body.phone,
        active:true

    }
    db.collection(col_name).insert(data,(err,result) =>{
        if(err) {
            res.status(401).send('Error in inserting')
        }else{
            res.redirect('/')
        };
    });
});

app.get('/',(req,res) => {
    db.collection(col_name).find({active:true}).toArray((err,result) => {
        if(err) {
            res.status(401).send('Error in Fetching')
        }else{
            res.render('index',{data:result})
        };
    });
});

//Read (Get Call)
app.get('/user', (req,res) => {
    var query = {}
    if(req.query.id && req.query.name){
        query = {id:parseInt(req.query.id),name:req.query.name, active:true}
    }else if(req.query.id){
        query = {id:parseInt(req.query.id), active:true}
    }else if(req.query.name){
        query = {name:req.query.name, active:true}
    }else{
        query = {active:true}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
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
        .findOneAndUpdate({'id':parseInt(req.body.id)},{
            $set:{
                id:parseInt(req.body.id),
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                active:true
            }
        },(err,result) => {
            if(err){
                res.status(401).send('Error in Updating')
            }else{
                res.send("Data Updated")
            }
        });
    
});

//Soft Delete (Put Call)
app.put('/softDelete',(req,res) => {
    db.collection(col_name)
        .findOneAndUpdate({'id':req.body.id},{
            $set:{
                id:req.body.id,
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                active:false,
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
    console.log("id in server ",typeof(req.body.id))
    db.collection(col_name).findOneAndDelete({
        id:parseInt(req.body.id)
    },(err,result) => {
        if(err){
            res.status(401).send('Error in Deleting')
        }else{
            console.log("Data Deleted")
            res.send("Data Deleted")
        }
    });
});

app.get('/new',(req,res) => {
    var id =  Math.floor(Math.random()*10000);
    res.render('admin',{id:id})
})



MongoClient.connect(mongourl,(err,client) => {
    if(err) console.log("Error while connecting");
    db = client.db('classpractice');
    app.listen(port,(err) => {
        console.log(`Server listing to port ${port}`)
    })
})
