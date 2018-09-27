const express = require('express');
//const Task = require('./models/task');
var path = require('path');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const taskRoutes = require('./routes/taskRoutes');
const loginRoutes = require('./routes/loginRoutes');

const PORT = process.env.PORT || 5000;

const app = express();

//const PORT = 5000;

//view engine setup
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//cookie session configuration 
app.use(session({
    secret: 'abcd1234'
}));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


//custom authentication middleware
app.use(function(req,res,next){
    console.log(req.session);
    if(req.path !== '/login' && req.path !== '/login/logout'){
        if(typeof req.session.userName === 'undefined'){
            res.redirect('/login');
        }else{
            next();
        }
    }
    next();
});

//configuring routers
app.use('/login', loginRoutes);
app.use('/tasks', taskRoutes);

app.get('/', function(req,res){
    res.redirect('/login');
});

app.listen(PORT, function(){
    console.log("Server is runinng on PORT : ",PORT);
});

