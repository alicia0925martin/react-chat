const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" , 
        required: true, 
    }, 
    recieverId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
    }, 
    text: {
        type: String, 
        trim: true, 
        required: true, 
    },
    file: {
    url: { type: String, trim: true },      // Cloudinary or S3 URL
    type: { type: String, enum: ["image", "video", "audio", "document"], trim: true },
    name: { type: String, trim: true },     // Optional: original file name
  },
},{
    timestamps: true
})


module.exports = mongoose.model("Message" , messageSchema);