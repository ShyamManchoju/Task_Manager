const express = require('express');
const router = express();
const tasks = require('../data-source/tasks');
const Task = require('../models/task')

router.get('/',function (req,res){

    res.render('tasks/index',{
        title: 'Task Manager',
        task:tasks
    });

});

router.get('/:id',function (req,res){
    const {id} = req.params;
    
   let task={};
   tasks.forEach((el)=>{
    if(el.id == id){
        task = el;
    }
    });
    res.render("tasks/detail",{task:task});

});

router.post('/create',function (req,res){
 
    const newTask = new Task(tasks.length+1, req.body.task);
    if(req.body.task !== ''){
        tasks.push(newTask);
    }
    res.redirect('/tasks');
});

router.get('/delete/:id',function (req,res){
    const id = parseInt(req.params.id);
    tasks.forEach((el, index)=>{
        if(el.id == id){
            tasks.splice(index,1);
        }
        });
    res.redirect('/tasks');
});

module.exports = router;