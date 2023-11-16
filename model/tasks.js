const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//importing userID from userSchema
const user_id = require('./users');

//Create a new model for tasks
const taskSchema = new mongoose.Schema({
title: {
    type: String,
},
description:{
    type: String,
},
state: {
    type: String, value: ['pending', 'completed', 'deleted'], 
    default: 'pending'
},
user_id:{
    type: String,
    ref: 'users',
    required: true,
},

});

//exports the taskSchema as a model || collection name is 'tasks' in the database
const tasks = mongoose.model('tasks', taskSchema);
module.exports = tasks;