const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//create a new schema for the user
const userSchema = new mongoose.Schema({
name: { 
    type: String, 
    required: true 
},
email: { 
    type: String, 
    required: true, 
    unique: [true, "Email Already Exists"]
},
password: { 
    type: String, 
    required: true 
},
created_at: {
    type: Date,
    default: new Date()
},
});

//save password as hash
userSchema.pre('save', async function(next){
users = this;
const hash = await bcrypt.hash(this.password, 10);
this.password = hash;
next();
});

//check if password is valid
userSchema.methods.validatePassword = async function(password){  
users = this;
const compare = await bcrypt.compare(password, this.password);
return compare;
};


//exports the userSchema as a model || collection name is users in the database
const users = mongoose.model('users', userSchema);
module.exports = users;