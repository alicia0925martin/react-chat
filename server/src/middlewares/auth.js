
const jwt = require('jsonwebtoken');
const User = require('../models/User');

require("dotenv").config();


exports.auth = async(req , res , next)=>{
    try{
        const token = req.cookies.token || req.get("Authorization")?.split(" ")[0] || req.body?.token;
        

        if(!token){
            return res.status(404).json({
                success: false, 
                message: "token not found!"
            })
        }

        try{
            const payload = await jwt.verify(token , process.env.JWT_SECRET )
            const existingUser = await User.findById(payload.userId);

            req.user = existingUser;
        }
        catch(err){
            throw err;
        }

        next();
    }
    catch(err){
        console.log(err);
        console.error(err); 
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error", 
            error: err.message
        })
    }
}