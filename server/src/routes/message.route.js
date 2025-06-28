const express = require("express");
const { auth } = require("../middlewares/auth");
const { getUsers } = require("../controllers/message.controller");


const router = express.Router();



router.get("/users" , auth , getUsers);

router.get("getMessages/:userInChatId" , auth , getUsers);


module.exports = router;