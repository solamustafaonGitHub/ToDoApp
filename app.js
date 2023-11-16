const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require ('dotenv').config();

//importing the MongoDB connection function
const {connectToMongoDB} = require('./db');
//connect to MongoDB
connectToMongoDB();

//PORT at which the server will run
const PORT = process.env.PORT;

//create an express app
const app = express();

//importing the express-session || this is the middleware that will parse all incoming requests to JSON format
app.use(express.json());
//body parser: formdata
app.use(express.urlencoded({extended: true})); 

//importing morgan
app.use(morgan('dev'));

//importing body-parser
const bodyParser = require('body-parser');
//body-parser middleware
app.use(bodyParser.json());
app.use(express.static('public'));
//setting the middlewares for the express app
app.use(bodyParser.urlencoded({extended: false}));

//importing the userRoute
const userRoute = require('./users/usersRoute');
//importing the taskRoute
const taskRoute = require('./tasks/tasksRoute');
//this is the middleware that wil handle all requests to the /users route
app.use('/users', userRoute);
//this is the middleware that wil handle all requests to the /tasks route
app.use('/tasks', taskRoute);

//setting the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//Rendering the home page
app.get('/', (req, res) => {
console.log("Home Page Rendered");
res.render('index');
});

//Rendering the login page || Posting To The Login Page
app.get('/login', (req, res) => {
console.log(req.body);
res.render('login');
});

app.post('/login', (req, res) => {
console.log(req.body);
res.render('login');
});

//Rendering the signup page
app.get('/signup', (req, res) => {
console.log(req.body);
res.render('signup');
});

app.listen(PORT, () => {    
    console.log(`Server running at http://localhost:${PORT}`);
});





