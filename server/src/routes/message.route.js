const express = require("express");
const { auth } = require("../middlewares/auth");
const { getUsers, getMessageHistory, sendMessage } = require("../controllers/message.controller");


const router = express.Router();



router.get("/users" , auth , getUsers);

router.get("/getMessages/:userInChatId" , auth , getMessageHistory);

router.post("/sendMessage/:id" , auth , sendMessage);

module.exports = router;