const express = require('express'); 
const mongoose = require ('mongoose');
require('dotenv').config();

const cookieParser = require('cookie-parser');

const joi = require('joi');
const jwt = require('jsonwebtoken');

//import the task model
const taskModel = require('../model/tasks');

//create an express router
const taskRoute = express.Router();
taskRoute.use(cookieParser());

//Perform CRUD Operations ====> Create, Read, Update, Delete
1. //Create Task
taskRoute.post('/', (req, res) => {
    const task = req.body;
    console.log(task);
    
    taskModel.create(task)
    .then((task) => {
    res.status(201).send({message: 'Task created successfully', data: task});
    }) .catch((error) => {
        console.log(error);
        res.status(500).send('Internal Server Error');
    })
      });

2. //Read All Tasks
taskRoute.get('/', async (req, res) => {
    taskModel.find({})
    .then((tasks) => {
        res.send(tasks);
    })  
    .catch((error) => {
        console.log(error);
        res.status(500).send('Internal Server Error');
    })
});


//Read a task by ID 
taskRoute.get('/:id', (req, res) => {
const id = req.params.id;
console.log(id);
//Find and return one user by id
taskModel.findById(id)
.then((user) => {
res.status.send(user);
})
.catch((error) => {
console.log(error);
res.status(500).send('Internal Server Error');
})
});

//3. Update a task
taskRoute.put('/:id', (req, res) => { 
const id = req.params.id;
const updatedTask = req.body;
//perform update operation on the database
taskModel.findByIdAndUpdate(id, updatedTask, {new: true})
.then(task => {
    res.status(200).send({message:'Task Updated Successfully'});
}).catch((error) => {
console.log(error);
res.status(500).send('Internal Server Error');
    })
      });

//4. Delete a task by Id
taskRoute.delete('/:id', (req, res) => {
const id = req.params.id;
//perform delete operation to task collection in the database
taskModel.findByIdAndDelete(id)
.then (() => {
res.status(200).send({message: 'Task deleted successfully'});
}) .catch((error) => {
console.log(error);
res.status(500).send('Internal Server Error');
    })
      });


//get tasks that state = pending
const getPendingTasks = async (user_id) => {
const taskState = await taskModel.find({state: 'pending'});
if(!taskState){
console.log('Tasks not found');
return {status: 400, success: false, message: 'Tasks not found'}
}
console.log('Tasks found successfully');
return {status: 200, success: true, message: 'Tasks found successfully', data:{taskState: taskState}
        }
    }

//get tasks that state=completed
const getCompletedTasks = async (user_id) => {
const taskState = await taskModel.find({user_id, state: 'completed'});
if(!taskState){
console.log('Tasks not found');
return {status: 400, success: false, message: 'Tasks not found'}
}
console.log('Tasks found successfully');
return {status: 200, success: true, message: 'Tasks found successfully', data:{taskState: taskState}
    }
}

//export the TaskRoute
module.exports = taskRoute;


// //Task Router
// router.use(async (req, res, next) => {
// const token = req.cookies.jwt;
// if(token){
//     try{
//         const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);
//         res.locals.user = decodedValue
//         console.log('You are authenticated!')
//         next()
//         } catch(error){
//         console.log('You are not authenticated!')
//         res.redirect('/login')
//         } 
//     }
//     else{
//         res.redirect('/login')
//     }
// });   

// router.use('/tasks', router);
// router.post('/create', async (req, res) => {
//     const task = req.body;
//     const response = await createTask(task);
//     res.status(response.status).send(response);
// });
// router.use('/edit/:id', async (req, res) => {
//     const id = req.params.id;
//     const task = req.body;
//     const response = await editTask(id, task);
//     res.status(response.status).send(response);
// });
// router.use('/delete/:id', async (req, res) => {
//     const id = req.params.id;
//     const response = await deleteTask(id);
//     res.status(response.status).send(response);
// });



// module.exports = {
// router, 
// createTask, 
// getTasks, 
// deleteTask, 
// getPendingTasks, 
// getCompletedTasks
// }