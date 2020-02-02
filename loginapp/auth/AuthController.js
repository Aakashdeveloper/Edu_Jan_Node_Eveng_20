const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../user/User');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/register', (req,res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password,8);

    User.create({
        name:req.body.name,
        email:req.body.email,
        password: hashedPassword
    },(err,user) => {
        if(err) return res.status(500).send('Problem while register');
        //res.send('Registration successfull')
        const messsage = encodeURIComponent('Succesfully register Please login now')
        res.redirect('/?msg='+messsage)
    });
});

router.post('/login', (req,res) => {
    User.findOne({email:req.body.email}, (err,user) => {
        if(err) return res.status(401).send('Problem while login');
        if(!user){
            const messsage = encodeURIComponent('User Does not exist')
            res.redirect('/?msg='+messsage)
        }else{
            const passwordIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passwordIsValid) {
                const messsage = encodeURIComponent('Enter Correct password')
                res.redirect('/?msg='+messsage)
            }
            else{
                var token = jwt.sign({id:user._id}, config.secert, {
                    expiresIn: 86400 //24 hours
                });
                localStorage.setItem('authToken', token)
                res.redirect('/users/profile')
            }
        }
    });
});

router.get('/getUser', (req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) res.status(401).send({auth:false,message:'No Token Provided'});

    jwt.verify(token,config.secert,(err,decode) => {
        if(err) res.status(401).send({auth:false,message:'Invalid Token'});
        User.findById(decode.id,{password:0},(err,user) => {
            if(err) res.status(500).send('Problem finding user');
            if(!user) res.status(500).send('No User found');
            res.send(user)
        })
    } )
})


router.get('/users', (req,res) => {
    User.find({},(err,user) => {
        if(err) return res.status(500).send('Error while fetching user');
        res.send(user)
    });
});


module.exports = router;