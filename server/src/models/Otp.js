const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate = require('../templates/verificationMail');

const otpSchema = new mongoose.Schema({
    email: {
        type: String, 
        lowercase: true, 
        trim: true,
        required: true, 
    }, 
    otp:{
        type: Number, 
        required: true, 
    }, 
    createdAt:{
        type: Date, 
        required: true,
        default: Date.now(), 
        expires: 5 * 60,
    }
})


async function sendVerificationEmail(otp , email){
    try{
        const mailResponse = await mailSender(email , "OTP Verification Email - Chatty" , otpTemplate(otp) , otp);
        console.log("Email sent successfully!")
        console.log(mailResponse);
    }
    catch(err){
        console.log(err);
        console.error(err);
    }
}

otpSchema.pre("save" , async function(next){
    await sendVerificationEmail(this.otp , this.email);
    next();
})


module.exports = mongoose.model("OTP" , otpSchema);