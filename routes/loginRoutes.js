const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    let data = {
        errMsg:''
    };
    if(typeof req.session.errMsg !== 'undefined'){
        data.errMsg = req.session.errMsg;
        req.session.errMsg = '';
    }
    res.render('login/index', data);
});

router.post('/', function(req,res){
    //res.render('/tasks');
    const {userName, password } = req.body;
    if(userName === 'admin' && password === 'admin123'){
        req.session.userName = userName;
        res.redirect('/tasks');
    }else{
        req.session.errMsg = 'Username and Passwords do not match';
        res.redirect('/login');
    }
   
});

router.get('/logout',(req,res)=>{
    delete(req.session.userName);
    res.redirect('/login');
});
module.exports = router;