const cloudinary = require("cloudinary").v2


require('dotenv').config();

const cloudinaryConnect = async ()=>{
    try{
            cloudinary.config({
                cloud_name : process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_API_KEY,
                api_secret: process.env.CLOUD_API_SECRET       
            })
            console.log("cloudinary connected successfully....") 
        }
        catch(err){
            console.log(err);
            console.error(err);
        }
}   


module.exports = cloudinaryConnect;