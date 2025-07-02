const nodemailer = require("nodemailer")

require('dotenv').config();

const mailSender = async(email, title , body )=>{
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, 
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASSWORD,
            }
        })


        let info = await transporter.sendMail({
            from: process.env.MAIL_FROM || "Chatty - By Aryan" || "Chatty <no-reply@chatty.com>", 
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        console.log("Info" + info);
        return info;
    }
    catch(err){
        console.log(err); 
        console.log(err.message);
        throw err;
    }
}

module.exports = mailSender;