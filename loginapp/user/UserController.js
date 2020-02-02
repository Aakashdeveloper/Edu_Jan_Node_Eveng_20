const express = require('express');
const router  = express.Router();
const app = express();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../user/User');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static(__dirname+'/public'));

router.get('/signup',(req,res) => {
    res.render('signup')
});

router.get('/profile', (req,res) => {
    var token = localStorage.getItem('authToken');
    console.log(">>>>In Profile>>>>",token)
    if(!token){
        const messsage = encodeURIComponent('Login first for profile page')
        res.redirect('/?msg='+messsage)
    }
    jwt.verify(token,config.secert, (err,decode) => {
        if(err){
            const messsage = encodeURIComponent('Invalid Token')
            res.redirect('/?msg='+messsage)
        }
        User.findById(decode.id, {password:0}, (err,user) => {
            const messsage = encodeURIComponent('Invalid Token')
            const messsage1 = encodeURIComponent('No User found')
            if(err) { res.redirect('/?msg='+messsage)}
            if(!user) {
                res.redirect('/?msg='+messsage1)
            }
            res.render('profile',{user})
        })
    })
});

router.get('/logout', (req,res) => {
    localStorage.removeItem('authToken');
    const messsage = encodeURIComponent('SuccessFully Logout')
    res.redirect('/?msg='+messsage)

})

module.exports = router;




