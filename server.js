const express = require('express');
const mongoose = require('mongoose');
require ('dotenv').config();

//PORT at which the server will run
const port = process.env.PORT || 5500;

const {connectToMongoDB} = require('./db');
connectToMongoDB();

const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  