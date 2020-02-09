var express = require('express');
var app = express();
var port = 7800
var superagent = require('superagent');
var request = require('request');

app.use(express.static(__dirname+'/public'))
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/profile', (req,res) => {
    const {query} = req
    const {code} = query

    if(!code){
        res.send({
            success:false,
            message: 'Error Getting in code'
        })
    }

    //res.send(code)
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'3386b536c9a5e383bfa0',
            client_secret:'133a33ef39c68f26947628cc66f224ccbd39c29f',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err
            //res.send(result.body)
            var accesstoken = result.body.access_token;
            const option = {
                url:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':'token '+accesstoken,
                    'User-Agent':'my-github-SSO'
                }
            };
            request(option, function(err,response,body){
                return res.send(body)
            })

        })
})

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})