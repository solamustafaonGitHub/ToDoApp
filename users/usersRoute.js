const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cookieParser = require('cookie-parser');

const joi = require('joi');
const jwt = require('jsonwebtoken');

const middleware = require('../middleware');

//create an express router
const userRoute = express.Router();
userRoute.use(cookieParser());

//import the user model
const userModel = require('../model/users.js');

//CRUD Operations ====> Create, Read, Update, Delete
//1. Create a user
userRoute.post('/', (req, res) => {
const user = req.body;
console.log(user);

userModel.create(user)
.then((user) => {
res.status(201).send({message: 'User created successfully', data: user});
}) .catch((error) => {
    console.log(error);
    res.status(500).send('Internal Server Error');
})
  });

//2. Read All Users
userRoute.get('/', async (req, res) => {
    userModel.find({})
    .then((users) => {
        res.send(users);
    })  
    .catch((error) => {
        console.log(error);
        res.status(500).send('Internal Server Error');
    })
});

//Read a single user by ID 
userRoute.get('/:id', (req, res) => {
const id = req.params.id;
const user = userModel.find((user) => user.id == id);  
console.log(id);
//Find and return one user by id
if(!user) {
    res.status(404).send('User not found');
    return;
}

res.json(user)
.catch((error) => {
    console.log(error);
    res.status(500).send('Internal Server Error' + error);
})
});

//3. Update a user
userRoute.put('/:id', (req, res) => { 
const id = req.params.id;
const updatedUser = req.body;
//perform update operation on the database
userModel.findByIdAndUpdate(id, updatedUser, {new: true})
.then(user => {
    res.status(200).send({message:'User Updated Successfully'});
}).catch((error) => {
    console.log(error);
    res.status(500).send('Internal Server Error');
})
  });


//4. Delete a user
userRoute.delete('/:id', (req, res) => {
const id = req.params.id;
//perform delete operation to user collection in the database
userModel.findByIdAndDelete(id)
.then (() => {
    res.status(200).send({message: 'User deleted successfully'});
}) .catch((error) => {
    console.log(error);
    res.status(500).send('Internal Server Error');
})
  });

//export the userRoute
module.exports = userRoute;

