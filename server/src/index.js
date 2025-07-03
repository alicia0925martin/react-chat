const express = require("express")


// importing cors: 
const cors = require("cors");

const cookieParser = require('cookie-parser');
const dbConnect = require("./config/database");
const fileUpload = require("express-fileupload");
const cloudinaryConnect = require("./config/cloudinary");




const { app, io, server } = require("./config/socket");

require("dotenv").config();


// importing PORT 
const PORT = process.env.PORT || 4000;

// initializing the app 
// const app = express(); //no need we have created this is socket.js


// file upload middleware: 

app.use(cors({
  origin: ["http://localhost:5173", "https://chatty-frontend-7pr0.onrender.com"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// importing routes: 
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const messageRoutes = require("./routes/message.route");



app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/user" , userRoutes);
app.use("/api/v1/message" , messageRoutes);









dbConnect();
cloudinaryConnect();

// replaced app with server:
server.listen(PORT , ()=>{
    console.log(`server is running on ${PORT} port.`)
})


