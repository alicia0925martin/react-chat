const express = require("express")


const cookieParser = require('cookie-parser');
const dbConnect = require("./config/database");
const fileUpload = require("express-fileupload");
const cloudinaryConnect = require("./config/cloudinary");


require("dotenv").config();

// importing PORT 
const PORT = process.env.PORT || 4000;

// initializing the app 
const app = express();


// file upload middleware: 
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// configuring cors: 



// express.json() middleware: 
app.use(express.json());

// middlewares: 
app.use(cookieParser());



// importing routes: 
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const messageRoutes = require("./routes/message.route")



app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/user" , userRoutes);
app.use("/api/v1/message" , messageRoutes);




app.get("/" , (req , res)=>{
    res.send(`<h2>This is hello world</h2>`)
})






dbConnect();
cloudinaryConnect();

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT} port.`)
})


