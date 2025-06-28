const mongoose = require("mongoose")

require('dotenv').config();


const dbConnect =  ()=>{
    mongoose.connect(process.env.MONGODB_URL)

    .then(()=>console.log("db connected successfully!"))
    .catch((err)=>{
        console.log(err);
        console.error(err);
        console.log("Db connection failed");
        process.exit(1);
    })

}

module.exports = dbConnect;