var fs = require('fs');



/*fs.writeFile('mytext.txt','Thisline changed',function(err){
    if(err) throw err;
    console.log("data added")
});
fs.appendFile('mytext.txt','This line 1>>>\n',function(err){
    if(err) throw err;
    console.log("data added")
});

fs.appendFile('mytext1.txt','This line changed 3>>>',function(err){
    if(err) throw err;
    console.log("data added")
});

fs.readFile('db.json','utf-8', function(err,data){
    if(err) throw err;
    console.log(data)
});
/*
fs.appendFile('mytext.txt','This line 1>>>\n',function(err){
    if(err) throw err;
    fs.readFile('mytext.txt','utf-8', function(err,data){
        if(err) throw err;
        console.log(data)
    });
});


fs.rename('mytext1.txt','mytext2.txt', function(err,data){
    if(err) throw err;
    console.log("name updatedd")
});

if (fs.exists(mytext1.txt)){
    fs.readFile('mytext.txt','utf-8', function(err,data){
        if(err) throw err;
        console.log(data)
    });
}else{
    fs.appendFile('mytext1.txt','This line changed 3>>>',function(err){
        if(err) throw err;
        console.log("data added")
    });
}

fs.unlink('mytext2.txt',function(err){
    if(err) throw err;
    console.log("filedeleted")
})

*/
fs.appendFile('db2.json',JSON.stringify({'name':'c','class':3}),function(err){
    if(err) throw err;
    console.log("data added")
});