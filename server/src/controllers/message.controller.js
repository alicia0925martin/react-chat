const { getRecieverSocketId, io } = require("../config/socket");
const { getFileType } = require("../helpers");
const Message = require("../models/Message");
const User = require("../models/User");
const { uploadFileToCloudinary } = require("../utils/cloudinaryHelpers");

require("dotenv").config();

exports.getUsers = async(req ,res)=>{
    try{
        // from auth middleware: (fetch user Id)
        const userId  = req.user._id;

        // fetch all the users except the yourself: 
        const allUsers = await User.find({_id: {$ne:userId}}).select("-password")

        return res.status(200).json({
            success: true, 
            data: allUsers,
            message: "all users fetched successfully!"
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

exports.getMessageHistory = async(req, res)=>{
    try{
        // fetch the reciever id from params: 
        const userInChatId = req.params.userInChatId;

        const myId = req.user._id;

        // validate recieverId: 
        if(!userInChatId){
            return res.status(404).json({
                success: false, 
                message: "reciever id not found"
            })
        }

        const existingReciever = await User.findById(userInChatId);

        // check if reciever is valid user or not: 
        if(!existingReciever)
        {
            return res.status(401).json({
                success: false, 
                message: "reciever does not exists or invalid id."
            })
        }

        // fetch all the messages: 
        const allMessages = await Message.find({$or:[
            {
            senderId: userInChatId, 
            recieverId: myId
        },
         {
            senderId: myId, 
            recieverId: userInChatId
        }
        ]})

        // return the response: 
        return res.status(200).json({
            success: true, 
            data: allMessages,
            message: "all messages fetched successfully!", 
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


exports.sendMessage = async(req, res)=>{
    try{
        // fetch the data; 
        const {text} = req.body; 
        const  chatFile = req.files?.file; 

        // fetch the recieverId: 
        const recieverId = req.params.id;

        const senderId = req.user._id;


        const existingReciever = await User.findById(recieverId)

        if(!existingReciever){
            return res.status(404).json({
                success : false, 
                message: "reciever doesn't exists. Invalid id"
            })
        }

        

        if (!chatFile && (!text || text.trim() === ""))
        {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty"
            });
        }


        let formattedFile = null;
        if(chatFile){
           // fetch the file type: 
            const chatFileType = chatFile.mimetype ;
            
            const filePayload = await uploadFileToCloudinary(chatFile , process.env.CLOUDINARY_CHAT_FOLDER )

            const fileUrl = filePayload.secure_url;

            formattedFile = {
                url: fileUrl,
                type: getFileType(chatFileType),
                name: chatFile.name
            };
        }

        const messagePayload = await Message.create({
            senderId, 
            recieverId, 
            text, 
            file: formattedFile
        });


        // todo: real time functionality will be used here: 

        //fetch the reciever socket id
        const recieverSocketId = getRecieverSocketId(recieverId)

        if(recieverSocketId){
            // broadcasting but only to reciever:
            io.to(recieverSocketId).emit("newMessage" , messagePayload);
        }

        return res.status(200).json({
            success: true, 
            data : messagePayload,
            message: "message sent successfully!"
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