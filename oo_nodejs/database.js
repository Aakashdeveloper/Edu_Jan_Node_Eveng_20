const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
var dbName = 'testEduJan';

//Dummyy function
const maincall = (col) => {
    MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        var dbo = db.db('testEduJan');
        dbo.collection('first').find({}).toArray((err,data)=>{
            return data
        })
    })
}


//GetCall
var output;
maincall.prototype.getData = (colName) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(colName).find({}).toArray((err,result) => {
            if(err) throw err;
            console.log('Data Fetched')
            output = result
        })
    })
    return output
}

//PostCall
maincall.prototype.postData = (colName,dbObj) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(colName).insertOne(dbObj, (err,result) =>{
            if(err) throw err;
            db.close();
        })
    })
    let out = `Data inserted in ${colName}`
    return out
}


//UpdateCall
maincall.prototype.updateData = (colName,query,dbObj) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(colName).update(query,dbObj, (err,result) =>{
            if(err) throw err;
            db.close();
        })
    })
    let out = `Data Updatedd in ${colName}`
    return out
}



//DeleteData
maincall.prototype.deleteData = (colName,query) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(colName).deleteOne(query, (err,result) =>{
            if(err) throw err;
            db.close();
        })
    })
    let out = `Data deleted in ${colName}`
    return out
}

module.exports = maincall
