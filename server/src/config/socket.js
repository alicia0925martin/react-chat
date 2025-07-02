const {Server} = require("socket.io")
const http = require("http")
const express = require('express')


const app = express(); 
const server = http.createServer(app);


// arguments: httpserver , options(cors)
const io = new Server(server , {
    cors:{
        origin: ['http://localhost:5173'], 
    }
})
let userSocketMap = {};


// will give the socket id of the reciever by user id
function getRecieverSocketId(userId){
    return userSocketMap[userId];
}



// real time listening in server: 
io.on("connection" , (socket)=>{
    console.log("A user connected" , socket.id);
    const userId = socket.handshake.query.userId;
    
    if(userId) userSocketMap[userId] = socket.id;
    
    // broadcast online users everywhere
    io.emit("getOnlineUsers" , Object.keys(userSocketMap));
    
    socket.on("disconnect" , ()=>{
        console.log("a user disconnected" , socket.id);
        // removing from the userSocketMap
        delete userSocketMap[userId]
        // telling everyone this has disconnected
        io.emit("getOnlineUsers" , Object.keys(userSocketMap));
        
    })
})

module.exports = {
    io, 
    app, 
    getRecieverSocketId,
    server
}