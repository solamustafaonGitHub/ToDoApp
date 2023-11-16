const mongoose = require('mongoose');
require ('dotenv').config();

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

//connect to MongoDB
function connectToMongoDB() {
    mongoose.connect(MONGO_DB_CONNECTION_URL);

    mongoose.connection.on('connected', () => {
        console.log('Mongo DB Connection is successful!!!!');
    });

    mongoose.connection.on('error', (error) => {
        console.log(error)
        console.log('Mongo DB Connection Failed!!!!!', error);
    });
}

module.exports = {connectToMongoDB};

