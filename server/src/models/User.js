const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true, 
        required: true, 
        trim: true, 
        maxLength: 100, 
        minLength: 1
    }, 
    displayName: {
        type: String,
        trim: true,
        maxLength: 30
    },
    email: {
        type: String, 
        required: true, 
        lowercase: true, 
        trim: true, 
        unique : true,  
    }, 
    password: {
        type: String, 
        required: true,
        minLength: 8
    },
    contactNumber: {
        type: String,
        match: /^[0-9]{10}$/
    }, 
    profilePic: {
        type: String, 
        trim: true,
        default: ""
    }, 
    

}, {timestamps: true})

userSchema.methods.getJWT = async function(){
    try{
        const user = this;

    const payload = {
        userId : user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET , {
        expiresIn: "24h"
    });

    return token;

    }
    catch(err){
        throw err;
    }
}
userSchema.methods.validatePassword = async function(password){
    try{
        const user = this;

        const existingPassword = user.password;

        const isValidPassword =  bcrypt.compare(password , existingPassword);

        return isValidPassword;
    }
    catch(err){
        throw err;
    }
}

module.exports = mongoose.model("User" , userSchema);