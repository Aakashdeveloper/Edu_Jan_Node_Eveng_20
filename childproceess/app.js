const cluster = require('cluster');
const http = require('http');
const numCPUS = require('os').cpus().length;

if(cluster.isMaster){
    masterProcess()
}else{
    childProcess()
}

function masterProcess(){
    console.log(`Matser ${process.id} is running`)
    for(let i=0 ; i <numCPUS;i++){
        console.log(`Forking process number ${i}...`)
        cluster.fork()
    }

    cluster.on('exit',(worker) => {
        console.log(`Worker ${worker.process.pid} removed`);
        console.log(`Forking a new process after calculating`)
        cluster.fork()
    })
}

function childProcess(){
  console.log(`Worker ${process.pid} started.....`)
   http.createServer(function(req,res){
        res.writeHead(200);
        res.end(`<h1>Running on multi cores</h1>`);
        process.exit(1)
    }).listen(5600);
}


