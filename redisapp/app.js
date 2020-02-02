var express = require('express');
var axios = require('axios');
var redis = require('redis');
const app = express();
const port = 7600;

const client = redis.createClient({
    host:'localhost',
    port:6379
});

app.get('/data', (req,res) => {
    const userInput = (req.query.country).trim();
    const url = `https://en.m.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`

    return client.get(`wiki:${userInput}`,(err,result) => {
        if(result){
            const output = JSON.parse(result);
            return  res.send(output)
        } else {
            return axios.get(url)
                .then(response => {
                    const output  = response.data;
                    client.setex(`wiki:${userInput}`,3600,JSON.stringify({source:'RedisCache',...output}))
                    return res.json({source:'Api...',...output})
                })
        }
    })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})