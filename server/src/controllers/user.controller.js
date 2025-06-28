const { validateUpdateProfileData } = require("../helpers");
const User = require("../models/User");
const { validateFileType, uploadFileToCloudinary } = require("../utils/cloudinaryHelpers");


// dotenv configuration
require("dotenv").config();

exports.updateProfile = async(req, res)=>{
    try{

        // validate the details: 
        validateUpdateProfileData(req);

        const userId = req.user._id; 

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false, message: "user not found!"
            })
        }


        // uploading image to cloudinary and updating the profile url : 
        
        // fetch the image file : 
        const profilePic = req?.files?.profilePic;

        if(profilePic){
            // fetch the file type: 
            const fileType = profilePic.name.split(".").pop();

            // validate if image file is valid or not: 
            const VALID_FILE_TYPES = ["jpg" , "png" , "jpeg"];

            const isValidFileType = validateFileType(VALID_FILE_TYPES , fileType)

            if(!isValidFileType){
                return res.status(401).json({
                    success: false,
                    message: "profile pic file type is invalid!"
                })
            }

            const profileImagePayload = await uploadFileToCloudinary(profilePic , process.env.CLOUDINARY_FOLDER)

            const profilePicUrl = profileImagePayload.secure_url;
            
            user.profilePic = profilePicUrl;
        }

        Object.keys(req.body).forEach((key)=>{
            if(key !== "profilePic"){
                user[key] = req.body[key];
            }
        })

        
        
        await user.save();

        user.password = undefined;

        return res.status(200).json({
            success: true, 
            user: user, 
            message: "profile updated successfully!"
        })
        

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